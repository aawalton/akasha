import ts from "typescript"

export interface PopulationReadSwallowFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly reason: string
}

const POPULATION_CONSTRUCTORS: ReadonlySet<string> = new Set([
  "examinePopulation",
  "examineFilePopulation",
])

const MEMBER_IO_CALLS: ReadonlySet<string> = new Set([
  "readFileSync",
  "readFile",
  "readlinkSync",
  "readlink",
  "readdirSync",
  "readdir",
  "statSync",
  "stat",
  "lstatSync",
  "lstat",
  "accessSync",
  "access",
])

function calleeName(call: ts.CallExpression): string | undefined {
  const target = call.expression
  if (ts.isIdentifier(target)) return target.text
  if (ts.isPropertyAccessExpression(target)) return target.name.text
  return undefined
}

function isBunFileCall(call: ts.CallExpression): boolean {
  const target = call.expression
  if (!ts.isPropertyAccessExpression(target)) return false
  return (
    ts.isIdentifier(target.expression) &&
    target.expression.text === "Bun" &&
    target.name.text === "file"
  )
}

function declaresPopulation(sf: ts.SourceFile): boolean {
  return sf.statements.some((st) => {
    if (!ts.isImportDeclaration(st)) return false
    const bindings = st.importClause?.namedBindings
    if (bindings === undefined || !ts.isNamedImports(bindings)) return false
    return bindings.elements.some((el) => POPULATION_CONSTRUCTORS.has(el.name.text))
  })
}

function containsCall(root: ts.Node, matches: (call: ts.CallExpression) => boolean): boolean {
  let found = false
  const visit = (node: ts.Node): undefined => {
    if (found) return undefined
    if (ts.isCallExpression(node) && matches(node)) {
      found = true
      return undefined
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(root)
  return found
}

function isDirectMemberIo(call: ts.CallExpression): boolean {
  if (isBunFileCall(call)) return true
  const name = calleeName(call)
  return name !== undefined && MEMBER_IO_CALLS.has(name)
}

function functionBodyOf(
  node: ts.Node
): { readonly name: string; readonly body: ts.Node } | undefined {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined && node.body !== undefined) {
    return { name: node.name.text, body: node.body }
  }
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer !== undefined
  ) {
    const init = node.initializer
    if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
      return { name: node.name.text, body: init.body }
    }
  }
  return undefined
}

function ioBearingLocalFunctions(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    const fn = functionBodyOf(node)
    if (fn !== undefined && containsCall(fn.body, isDirectMemberIo)) names.add(fn.name)
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(sf, visit)
  return names
}

function neverReturningLocalFunctions(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      if (node.type?.kind === ts.SyntaxKind.NeverKeyword) names.add(node.name.text)
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const init = node.initializer
      if (
        init !== undefined &&
        (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) &&
        init.type?.kind === ts.SyntaxKind.NeverKeyword
      ) {
        names.add(node.name.text)
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(sf, visit)
  return names
}

const RUN_ENDING_CALLS: ReadonlySet<string> = new Set(["exitOnResult", "exitOnToolError"])

function isRunEndingStatement(st: ts.Statement, neverReturning: ReadonlySet<string>): boolean {
  if (ts.isThrowStatement(st)) return true
  const expr = ts.isExpressionStatement(st)
    ? st.expression
    : ts.isReturnStatement(st)
      ? st.expression
      : undefined
  if (expr === undefined || !ts.isCallExpression(expr)) return false
  const target = expr.expression
  if (ts.isIdentifier(target))
    return RUN_ENDING_CALLS.has(target.text) || neverReturning.has(target.text)
  if (ts.isPropertyAccessExpression(target)) {
    return (
      ts.isIdentifier(target.expression) &&
      target.expression.text === "process" &&
      target.name.text === "exit"
    )
  }
  return false
}

function resumesEnclosingWalk(block: ts.Block): string | undefined {
  let keyword: string | undefined
  const visit = (node: ts.Node): undefined => {
    if (keyword !== undefined) return undefined
    if (ts.isContinueStatement(node)) {
      keyword = "continue"
      return undefined
    }
    if (ts.isBreakStatement(node)) {
      keyword = "break"
      return undefined
    }
    if (
      ts.isIterationStatement(node, false) ||
      ts.isSwitchStatement(node) ||
      ts.isFunctionLike(node)
    ) {
      return undefined
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(block, visit)
  return keyword
}

export function scanPopulationReadSwallow(
  sf: ts.SourceFile
): readonly PopulationReadSwallowFinding[] {
  if (!declaresPopulation(sf)) return []
  const indirect = ioBearingLocalFunctions(sf)
  const neverReturning = neverReturningLocalFunctions(sf)
  const touchesMember = (call: ts.CallExpression): boolean => {
    if (isDirectMemberIo(call)) return true
    const name = calleeName(call)
    return name !== undefined && indirect.has(name)
  }

  const findings: PopulationReadSwallowFinding[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isTryStatement(node) && node.catchClause !== undefined) {
      const body = node.catchClause.block
      if (containsCall(node.tryBlock, touchesMember)) {
        const resumed = resumesEnclosingWalk(body)
        const reason =
          resumed !== undefined
            ? `member read failure resumed with \`${resumed}\``
            : body.statements.some((s) => isRunEndingStatement(s, neverReturning))
              ? undefined
              : "member read failure falls out of the catch"
        if (reason !== undefined) {
          const pos = sf.getLineAndCharacterOfPosition(node.catchClause.getStart(sf))
          findings.push({
            file: sf.fileName,
            line: pos.line + 1,
            column: pos.character + 1,
            reason: `${reason} — the member leaves the denominator with the numerator, so coverage rounds up to complete`,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(sf, visit)
  return findings
}
