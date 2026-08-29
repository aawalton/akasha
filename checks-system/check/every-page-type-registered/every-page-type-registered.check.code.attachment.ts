import { dirname, relative, resolve } from "node:path"
import ts from "typescript"
import type { Check, CheckFailure } from "../check-shape.ts"

const AKASHA = "akasha"

const REGISTRY = "akasha/pages-system/page-type/every-page-type.module.code.ts"

const HELD = "everyPageType"

const ENDING = ".page-type.ts"

const ABSENT =
  "the page-type registry is not here, so nothing states which page types the type system sees " +
  "— every relation targeting a page type would answer from a registry that is not there"

const UNHELD =
  "stands on disk and the registry does not import it, so the type system does not see it and " +
  "every relation targeting it admits a bare identifier again"

const UNFILED =
  "is imported by the registry and nothing stands at that path, so the registry names a page " +
  "type that is not there"

const UNLISTED =
  `is imported by the registry and does not appear in \`${HELD}\`, so it is read as registered ` +
  "while the type system does not see it"

const UNIMPORTED = `appears in \`${HELD}\` and is imported by nothing, so it names no page type`

type Held = {
  readonly imported: ReadonlyMap<string, string>
  readonly listed: readonly string[]
}

function sourceOf(path: string, body: string): ts.SourceFile {
  return ts.createSourceFile(path, body, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function bindingsOf(clause: ts.ImportClause | undefined): readonly string[] {
  if (clause === undefined) return []
  const named = clause.namedBindings
  if (named === undefined || !ts.isNamedImports(named)) return []
  return named.elements.map((one) => one.name.text)
}

function objectIn(node: ts.Expression): ts.ObjectLiteralExpression | null {
  if (ts.isObjectLiteralExpression(node)) return node
  if (ts.isAsExpression(node)) return objectIn(node.expression)
  return null
}

function listedIn(source: ts.SourceFile): readonly string[] {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (!ts.isIdentifier(one.name) || one.name.text !== HELD) continue
      const held = one.initializer === undefined ? null : objectIn(one.initializer)
      if (held === null) continue
      const found: string[] = []
      for (const member of held.properties) {
        const name = member.name
        if (name !== undefined && ts.isIdentifier(name)) found.push(name.text)
      }
      return found
    }
  }
  return []
}

function heldIn(at: string, body: string): Held {
  const source = sourceOf(at, body)
  const imported = new Map<string, string>()
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const named = statement.moduleSpecifier
    if (!ts.isStringLiteral(named) || !named.text.endsWith(ENDING)) continue
    const to = resolve(dirname(at), named.text)
    for (const binding of bindingsOf(statement.importClause)) imported.set(binding, to)
  }
  return { imported, listed: listedIn(source) }
}

export const everyPageTypeRegistered = {
  slug: "every-page-type-registered",
  needs: "tree",
  run: ({ root, tree }) => {
    const under = resolve(root, AKASHA)
    const at = resolve(root, REGISTRY)
    const body = tree.at(at)
    if (body === null) return [{ path: at, reason: ABSENT }]
    const held = heldIn(at, body.toString("utf8"))
    const stood = new Set(tree.paths())
    const failures: CheckFailure[] = []
    const wanted = new Set(held.imported.values())
    for (const path of tree.paths()) {
      if (!path.startsWith(`${under}/`) || !path.endsWith(ENDING)) continue
      if (!wanted.has(path)) failures.push({ path, reason: UNHELD })
    }
    const listed = new Set(held.listed)
    for (const [binding, to] of held.imported) {
      if (!stood.has(to)) {
        failures.push({ path: at, reason: `\`${relative(root, to)}\` ${UNFILED}` })
      }
      if (!listed.has(binding)) failures.push({ path: at, reason: `\`${binding}\` ${UNLISTED}` })
    }
    for (const binding of held.listed) {
      if (!held.imported.has(binding)) {
        failures.push({ path: at, reason: `\`${binding}\` ${UNIMPORTED}` })
      }
    }
    return failures
  },
} satisfies Check

export default everyPageTypeRegistered
