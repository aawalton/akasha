import ts from "typescript"
import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"

const ENV_KEY_RE = /NEXT_PUBLIC_[A-Z0-9_]+/g

const STRIPPED_ROUTE_EXPORTS: ReadonlySet<string> = new Set([
  "loader",
  "action",
  "headers",
  "middleware",
  "unstable_middleware",
])

export function extractDefinedEnvKeys(defineSources: readonly string[]): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const source of defineSources) {
    for (const match of source.matchAll(ENV_KEY_RE)) keys.add(match[0])
  }
  return keys
}

export type EnvRefSpelling = "direct" | "destructured" | "aliased"

export interface ClientEnvViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly key: string
  readonly spelling: EnvRefSpelling
  readonly message: string
}

const isProcessEnv = (expr: ts.Node): boolean =>
  ts.isPropertyAccessExpression(expr) &&
  expr.name.text === "env" &&
  ts.isIdentifier(expr.expression) &&
  expr.expression.text === "process"

function memberKey(node: ts.Node, base: (expr: ts.Node) => boolean): string | undefined {
  if (ts.isPropertyAccessExpression(node) && base(node.expression)) {
    return node.name.text.startsWith("NEXT_PUBLIC_") ? node.name.text : undefined
  }
  if (
    ts.isElementAccessExpression(node) &&
    base(node.expression) &&
    ts.isStringLiteralLike(node.argumentExpression)
  ) {
    const key = node.argumentExpression.text
    return key.startsWith("NEXT_PUBLIC_") ? key : undefined
  }
  return undefined
}

const envRefKey = (node: ts.Node): string | undefined => memberKey(node, isProcessEnv)

function destructuredKeys(
  pattern: ts.ObjectBindingPattern
): readonly { readonly key: string; readonly at: ts.Node }[] {
  const out: { key: string; at: ts.Node }[] = []
  for (const element of pattern.elements) {
    const named = element.propertyName ?? element.name
    const spelled = ts.isComputedPropertyName(named) ? named.expression : named
    if (!ts.isIdentifier(spelled) && !ts.isStringLiteralLike(spelled)) continue
    if (!spelled.text.startsWith("NEXT_PUBLIC_")) continue
    out.push({ key: spelled.text, at: element })
  }
  return out
}

function isStrippedRouteExport(stmt: ts.Statement): boolean {
  if (ts.isFunctionDeclaration(stmt)) {
    return stmt.name !== undefined && STRIPPED_ROUTE_EXPORTS.has(stmt.name.text)
  }
  if (ts.isVariableStatement(stmt)) {
    return stmt.declarationList.declarations.some(
      (d) => ts.isIdentifier(d.name) && STRIPPED_ROUTE_EXPORTS.has(d.name.text)
    )
  }
  return false
}

export function scanClientEnvRefs(args: {
  readonly relPath: string
  readonly text: string
  readonly allowedKeys: ReadonlySet<string>
  readonly isRouteModule: boolean
}): readonly ClientEnvViolation[] {
  const sourceFile = ts.createSourceFile(
    args.relPath,
    args.text,
    ts.ScriptTarget.Latest,
    true,
    args.relPath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
  const violations: ClientEnvViolation[] = []
  const aliases = new Set<string>()

  const lineOf = (node: ts.Node): number =>
    sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1

  const push = (
    node: ts.Node,
    key: string,
    spelling: EnvRefSpelling,
    message: string
  ): undefined => {
    violations.push({ file: args.relPath, line: lineOf(node), key, spelling, message })
    return undefined
  }

  const recordDirect = (node: ts.Node, key: string): undefined => {
    if (args.allowedKeys.has(key)) return undefined
    return push(
      node,
      key,
      "direct",
      `\`process.env.${key}\` is referenced in client-bundled code but not handled by any vite define (would inline to undefined) — add it to REQUIRED_KEYS/OPTIONAL_KEYS in @akasha/supabase-rr/client-env-define, or stop referencing it.`
    )
  }

  const recordUnreplaceable = (
    node: ts.Node,
    key: string,
    spelling: "destructured" | "aliased",
    how: string
  ): undefined =>
    push(
      node,
      key,
      spelling,
      `\`${key}\` is read in client-bundled code ${how}, a spelling vite's define does not replace — it substitutes the \`process.env.${key}\` member expression only, so this leaves a bare \`process.env\` in the shipped bundle (\`process is not defined\`). Read it as \`process.env.${key}\` directly.`
    )

  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      if (isProcessEnv(node.initializer)) {
        if (ts.isIdentifier(node.name)) aliases.add(node.name.text)
        if (ts.isObjectBindingPattern(node.name)) {
          for (const found of destructuredKeys(node.name)) {
            recordUnreplaceable(
              found.at,
              found.key,
              "destructured",
              "by destructuring `process.env`"
            )
          }
        }
      }
    }

    const direct = envRefKey(node)
    if (direct !== undefined) recordDirect(node, direct)

    const viaAlias = memberKey(node, (expr) => ts.isIdentifier(expr) && aliases.has(expr.text))
    if (viaAlias !== undefined) {
      recordUnreplaceable(node, viaAlias, "aliased", "through a local bound to `process.env`")
    }

    ts.forEachChild(node, walk)
    return undefined
  }

  for (const stmt of sourceFile.statements) {
    if (args.isRouteModule && isStrippedRouteExport(stmt)) continue
    walk(stmt)
  }

  return violations
}
