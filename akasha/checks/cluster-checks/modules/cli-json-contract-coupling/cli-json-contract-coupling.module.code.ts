import ts from "typescript"
import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"

const EXCLUDED_TEST_SUFFIXES: readonly string[] = [
  ".cli.test.ts",
  ".cli.test.tsx",
  ".smoke.test.ts",
  ".smoke.test.tsx",
  ".database.test.ts",
  ".database.test.tsx",
  ".integration.test.ts",
  ".integration.test.tsx",
  ".browser.test.ts",
  ".browser.test.tsx",
]

export function isExcludedTestFile(file: string): boolean {
  return EXCLUDED_TEST_SUFFIXES.some((suffix) => file.endsWith(suffix))
}

export interface ContractCouplingViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly schemaName: string
  readonly importedBy: string | null
}

export interface ContractImport {
  readonly specifier: string
  readonly names: readonly string[]
}

function parseSource(filePath: string, source: string): ts.SourceFile {
  const kind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  return ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, kind)
}

const isStrictCall = (node: ts.Node): node is ts.CallExpression =>
  ts.isCallExpression(node) &&
  ts.isPropertyAccessExpression(node.expression) &&
  (node.expression.name.text === "strict" || node.expression.name.text === "strictObject")

const isImmediatelyParsed = (call: ts.CallExpression): boolean => {
  const access = call.parent
  if (!ts.isPropertyAccessExpression(access) || access.expression !== call) return false
  if (access.name.text !== "parse" && access.name.text !== "safeParse") return false
  return ts.isCallExpression(access.parent) && access.parent.expression === access
}

function unwrapToRoot(expression: ts.Node): ts.Node {
  let cur: ts.Node = expression
  for (;;) {
    if (ts.isPropertyAccessExpression(cur)) cur = cur.expression
    else if (ts.isCallExpression(cur)) cur = cur.expression
    else if (ts.isElementAccessExpression(cur)) cur = cur.expression
    else if (ts.isNonNullExpression(cur) || ts.isParenthesizedExpression(cur)) cur = cur.expression
    else if (ts.isSatisfiesExpression(cur) || ts.isAsExpression(cur)) cur = cur.expression
    else return cur
  }
}

function zodBindings(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const spec = node.moduleSpecifier.text
      const clause = node.importClause
      if ((spec === "zod" || spec.startsWith("zod/")) && clause !== undefined) {
        if (clause.name !== undefined) names.add(clause.name.text)
        const bindings = clause.namedBindings
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.add(bindings.name.text)
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) names.add(element.name.text)
        }
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return names
}

function zodRootedLocals(sf: ts.SourceFile, zod: ReadonlySet<string>): ReadonlySet<string> {
  const declarations: { name: string; initializer: ts.Expression }[] = []
  const collect = (node: ts.Node): undefined => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined
    ) {
      declarations.push({ name: node.name.text, initializer: node.initializer })
    }
    ts.forEachChild(node, collect)
    return undefined
  }
  collect(sf)

  const rooted = new Set<string>()
  const rootsInSet = (expression: ts.Expression): boolean => {
    const root = unwrapToRoot(expression)
    return ts.isIdentifier(root) && (zod.has(root.text) || rooted.has(root.text))
  }
  for (let round = 0; round <= declarations.length; round++) {
    let grew = false
    for (const declaration of declarations) {
      if (rooted.has(declaration.name)) continue
      if (rootsInSet(declaration.initializer)) {
        rooted.add(declaration.name)
        grew = true
      }
    }
    if (!grew) break
  }
  return rooted
}

function isZodStrictCall(
  node: ts.Node,
  zod: ReadonlySet<string>,
  locals: ReadonlySet<string>
): node is ts.CallExpression {
  if (!isStrictCall(node)) return false
  const root = unwrapToRoot(node.expression)
  return ts.isIdentifier(root) && (zod.has(root.text) || locals.has(root.text))
}

interface SchemaBinding {
  readonly name: string
  readonly coupled: boolean
}

const isZodTypeReference = (text: string): boolean =>
  text.includes("ZodType") || text.includes("ZodSchema")

function bindingFor(node: ts.Node, sf: ts.SourceFile): SchemaBinding {
  let cur: ts.Node | undefined = node
  let coupled = false
  while (cur !== undefined) {
    if (
      (ts.isSatisfiesExpression(cur) || ts.isAsExpression(cur)) &&
      isZodTypeReference(cur.type.getText(sf))
    ) {
      coupled = true
    }
    if (ts.isVariableDeclaration(cur)) {
      const annotated = cur.type !== undefined && isZodTypeReference(cur.type.getText(sf))
      const name = ts.isIdentifier(cur.name) ? cur.name.text : "(inline)"
      return { name, coupled: coupled || annotated }
    }
    cur = cur.parent
  }
  return { name: "(inline)", coupled }
}

function inferredSchemaNames(sf: ts.SourceFile, zod: ReadonlySet<string>): ReadonlySet<string> {
  const names = new Set<string>()
  const collectFromType = (node: ts.Node): undefined => {
    if (
      ts.isTypeReferenceNode(node) &&
      ts.isQualifiedName(node.typeName) &&
      ts.isIdentifier(node.typeName.left) &&
      zod.has(node.typeName.left.text) &&
      node.typeArguments !== undefined
    ) {
      for (const argument of node.typeArguments) {
        if (ts.isTypeQueryNode(argument) && ts.isIdentifier(argument.exprName)) {
          names.add(argument.exprName.text)
        }
      }
    }
    ts.forEachChild(node, collectFromType)
    return undefined
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isTypeAliasDeclaration(node)) collectFromType(node.type)
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return names
}

function zodStrictCalls(sf: ts.SourceFile, zod: ReadonlySet<string>): readonly ts.CallExpression[] {
  if (zod.size === 0) return []
  const locals = zodRootedLocals(sf, zod)
  const found: ts.CallExpression[] = []
  const visit = (node: ts.Node): undefined => {
    if (isZodStrictCall(node, zod, locals) && !isImmediatelyParsed(node)) found.push(node)
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return found
}

export function findUncoupledContracts(args: {
  source: string
  filePath: string
}): readonly ContractCouplingViolation[] {
  const { source, filePath } = args
  if (!isExcludedTestFile(filePath)) return []
  if (!source.includes(".strict")) return []
  const sf = parseSource(filePath, source)
  return zodStrictCalls(sf, zodBindings(sf)).map((call) => {
    const line = sf.getLineAndCharacterOfPosition(call.getStart(sf)).line + 1
    const { name } = bindingFor(call, sf)
    return {
      file: filePath,
      line,
      schemaName: name,
      importedBy: null,
      message: `local .strict() contract schema "${name}" in a CI-excluded test class — import a producer-coupled schema from a shared module, or use .passthrough() if no exact contract is asserted`,
    }
  })
}

export function findContractImports(args: {
  source: string
  filePath: string
}): readonly ContractImport[] {
  const { source, filePath } = args
  if (!isExcludedTestFile(filePath)) return []
  const sf = parseSource(filePath, source)
  const imports: ContractImport[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text.startsWith(".") &&
      node.importClause !== undefined &&
      !node.importClause.isTypeOnly
    ) {
      const bindings = node.importClause.namedBindings
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        const names = bindings.elements
          .filter((element) => !element.isTypeOnly)
          .map((element) => (element.propertyName ?? element.name).text)
        if (names.length > 0) imports.push({ specifier: node.moduleSpecifier.text, names })
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return imports
}

export interface ModuleContractSchema {
  readonly schemaName: string
  readonly line: number
  readonly coupled: boolean
}

export function findModuleContractSchemas(args: {
  source: string
  filePath: string
}): readonly ModuleContractSchema[] {
  const { source, filePath } = args
  if (!source.includes(".strict")) return []
  const sf = parseSource(filePath, source)
  const zod = zodBindings(sf)
  const inferred = inferredSchemaNames(sf, zod)

  const firstLine = new Map<string, number>()
  const coupled = new Set<string>()
  for (const call of zodStrictCalls(sf, zod)) {
    const binding = bindingFor(call, sf)
    if (binding.name === "(inline)") continue
    const line = sf.getLineAndCharacterOfPosition(call.getStart(sf)).line + 1
    if (!firstLine.has(binding.name)) firstLine.set(binding.name, line)
    if (binding.coupled || inferred.has(binding.name)) coupled.add(binding.name)
  }

  return [...firstLine].map(([schemaName, line]) => ({
    schemaName,
    line,
    coupled: coupled.has(schemaName),
  }))
}

export function uncoupledImportedContract(args: {
  filePath: string
  schema: ModuleContractSchema
  importedBy: string
}): ContractCouplingViolation {
  const { filePath, schema, importedBy } = args
  return {
    file: filePath,
    line: schema.line,
    schemaName: schema.schemaName,
    importedBy,
    message: `.strict() contract schema "${schema.schemaName}" is read by the CI-excluded test ${importedBy} and is typechecked against nothing — couple it with satisfies z.ZodType<ProducerType>, or export a z.infer alias the producer annotates its output with`,
  }
}
