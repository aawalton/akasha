import ts from "typescript"
import { type Ctx, pushFinding } from "./forbidden-ctx"
import {
  checkAwait,
  checkCallExpression,
  checkImport,
  checkNewExpression,
  checkParameter,
  checkThrow,
} from "./forbidden-rules"
import type { FindForbiddenOptions, ForbiddenFinding } from "./forbidden-types"


const UNIVERSAL_RUNTIME_IMPORT_ALLOWED: ReadonlySet<string> = new Set(["@shared/utils-narrow"])

export function findForbidden(opts: FindForbiddenOptions): readonly ForbiddenFinding[] {
  const findings: ForbiddenFinding[] = []
  const emit = (finding: ForbiddenFinding): undefined => {
    findings.push(finding)
  }
  const allowed = new Set<string>(UNIVERSAL_RUNTIME_IMPORT_ALLOWED)
  if (opts.runtimeImportAllowed !== undefined) {
    for (const m of opts.runtimeImportAllowed) allowed.add(m)
  }
  for (const { path, content } of opts.files) {
    const sf = ts.createSourceFile(path, content, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS)
    visitFile(sf, path, allowed, emit)
  }
  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    return a.column - b.column
  })
  return findings
}

function visitFile(
  sf: ts.SourceFile,
  file: string,
  allowed: ReadonlySet<string>,
  emit: (finding: ForbiddenFinding) => undefined
): undefined {
  const ctx: Ctx = { sf, file, allowed, emit }
  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) {
      checkImport(stmt, ctx)
    }
  }
  visit(sf, ctx)
}

function visit(node: ts.Node, ctx: Ctx): undefined {
  if (ts.isImportDeclaration(node)) return

  if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
    pushFinding(node, "class", "class declarations are forbidden — use functions and modules", ctx)
  }

  if (ts.isNewExpression(node)) {
    checkNewExpression(node, ctx)
  }

  if (ts.isCallExpression(node)) {
    checkCallExpression(node, ctx)
  }

  if (ts.isAwaitExpression(node)) {
    checkAwait(node, ctx)
  }

  if (node.kind === ts.SyntaxKind.AnyKeyword) {
    pushFinding(node, "untypedAny", "explicit `any` is forbidden — use a precise type", ctx)
  }

  if (ts.isParameter(node)) {
    checkParameter(node, ctx)
  }

  if (ts.isThrowStatement(node)) {
    checkThrow(node, ctx)
  }

  if (ts.isTryStatement(node)) {
    if (node.finallyBlock !== undefined) {
      pushFinding(
        node,
        "tryFinally",
        "try / finally is forbidden — plpgsql has no `finally` analogue at function-block scope",
        ctx
      )
    }
  }

  ts.forEachChild(node, (child) => visit(child, ctx))
}
