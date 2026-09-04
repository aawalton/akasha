import { posix } from "node:path"
import ts from "typescript"
import {
  type CollectionSense,
  collectNonEmptyIdentifiers,
  resolveCollectionExistsVar,
} from "../guarded-resolve-collection/guarded-resolve-collection.module.code.ts"
import {
  calleeName,
  collectNegatedIdentifiers,
  collectScope,
  exprText,
  isSkipGate,
  isSkipShaped,
  resolvePathExpr,
  type ScopeInfo,
  scriptKindFor,
} from "../guarded-resolve-scope/guarded-resolve-scope.module.code.ts"

export interface GuardedResolveViolation {
  message?: string
  readonly file: string
  readonly line: number
  readonly literal: string
  readonly resolvedRel: string
  readonly guardKind: "skipIf" | "existsSync-early-return"
}

type GuardContext =
  | { readonly kind: "skipIf" }
  | { readonly kind: "existsSync-early-return"; readonly thenBranch: ts.Statement }

function classifyInlineGuard(existsCall: ts.CallExpression): GuardContext | null {
  let node: ts.Node = existsCall
  let parent: ts.Node | undefined = existsCall.parent
  let negated = false

  while (parent !== undefined) {
    if (ts.isPrefixUnaryExpression(parent) && parent.operator === ts.SyntaxKind.ExclamationToken) {
      negated = !negated
      node = parent
      parent = parent.parent
      continue
    }
    if (ts.isParenthesizedExpression(parent)) {
      node = parent
      parent = parent.parent
      continue
    }
    if (
      ts.isBinaryExpression(parent) &&
      (parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        parent.operatorToken.kind === ts.SyntaxKind.BarBarToken)
    ) {
      node = parent
      parent = parent.parent
      continue
    }
    if (ts.isCallExpression(parent)) {
      const inArgs = parent.arguments.some((a) => a === node)
      if (isSkipGate(parent) && inArgs && negated) return { kind: "skipIf" }
      return null
    }
    if (ts.isIfStatement(parent) && parent.expression === node) {
      if (!negated) return null
      return { kind: "existsSync-early-return", thenBranch: parent.thenStatement }
    }
    return null
  }
  return null
}

function resolveDerivedExistsVar(
  name: string,
  sf: ts.SourceFile,
  fileDir: string,
  scope: ScopeInfo,
  topLevelDirs: ReadonlySet<string>
): {
  readonly rel: string
  readonly existsCall: ts.CallExpression
  readonly arg: ts.Expression
} | null {
  const init = scope.initByName.get(name)
  if (init === undefined) return null
  if (!ts.isCallExpression(init) || calleeName(init) !== "existsSync") return null
  const arg = init.arguments[0]
  if (arg === undefined) return null
  const rel = resolvePathExpr(arg, sf, fileDir, scope, topLevelDirs, false)
  if (rel === null) return null
  return { rel, existsCall: init, arg }
}

export function findGuardedResolveViolations(input: {
  readonly source: string
  readonly filePath: string
  readonly isGitTracked: (repoRelPath: string) => boolean
  readonly topLevelDirs: ReadonlySet<string>
}): readonly GuardedResolveViolation[] {
  const { source, filePath, isGitTracked, topLevelDirs } = input
  const sf = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(filePath)
  )
  const fileDir = posix.dirname(filePath)
  const scope = collectScope(sf)
  const seen = new Set<string>()
  const violations: GuardedResolveViolation[] = []

  function emit(v: GuardedResolveViolation): undefined {
    const key = `${v.file}:${v.line}:${v.guardKind}:${v.resolvedRel}`
    if (seen.has(key)) return
    seen.add(key)
    violations.push(v)
  }

  function emitCollection(params: {
    readonly name: string
    readonly sense: CollectionSense
    readonly guardKind: GuardedResolveViolation["guardKind"]
  }): undefined {
    const found = resolveCollectionExistsVar({
      name: params.name,
      sf,
      fileDir,
      scope,
      topLevelDirs,
    })
    if (found === null || found.sense !== params.sense) return
    const tracked = found.rels.filter(isGitTracked).sort()
    const first = tracked[0]
    if (first === undefined) return
    emit({
      file: filePath,
      line: sf.getLineAndCharacterOfPosition(found.existsCall.getStart(sf)).line + 1,
      literal: exprText(found.arg, sf),
      resolvedRel: first,
      guardKind: params.guardKind,
    })
  }

  function visit(node: ts.Node): undefined {
    if (ts.isCallExpression(node) && calleeName(node) === "existsSync") {
      const arg = node.arguments[0]
      if (arg !== undefined) {
        const rel = resolvePathExpr(arg, sf, fileDir, scope, topLevelDirs, true)
        if (rel !== null && isGitTracked(rel)) {
          const guard = classifyInlineGuard(node)
          if (guard !== null && (guard.kind === "skipIf" || isSkipShaped(guard.thenBranch))) {
            emit({
              file: filePath,
              line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
              literal: exprText(arg, sf),
              resolvedRel: rel,
              guardKind: guard.kind,
            })
          }
        }
      }
    }

    if (ts.isCallExpression(node) && isSkipGate(node)) {
      const cond = node.arguments[0]
      if (cond !== undefined) {
        for (const ident of collectNegatedIdentifiers(cond)) {
          const r = resolveDerivedExistsVar(ident.text, sf, fileDir, scope, topLevelDirs)
          if (r !== null && isGitTracked(r.rel)) {
            emit({
              file: filePath,
              line: sf.getLineAndCharacterOfPosition(r.existsCall.getStart(sf)).line + 1,
              literal: exprText(r.arg, sf),
              resolvedRel: r.rel,
              guardKind: "skipIf",
            })
          }
          emitCollection({ name: ident.text, sense: "true-on-presence", guardKind: "skipIf" })
        }
        for (const ident of collectNonEmptyIdentifiers(cond)) {
          emitCollection({ name: ident.text, sense: "true-on-absence", guardKind: "skipIf" })
        }
      }
    }

    if (ts.isIfStatement(node)) {
      const skipShaped = isSkipShaped(node.thenStatement)
      for (const ident of collectNegatedIdentifiers(node.expression)) {
        const r = resolveDerivedExistsVar(ident.text, sf, fileDir, scope, topLevelDirs)
        if (r !== null && isGitTracked(r.rel) && skipShaped) {
          emit({
            file: filePath,
            line: sf.getLineAndCharacterOfPosition(r.existsCall.getStart(sf)).line + 1,
            literal: exprText(r.arg, sf),
            resolvedRel: r.rel,
            guardKind: "existsSync-early-return",
          })
        }
        if (skipShaped) {
          emitCollection({
            name: ident.text,
            sense: "true-on-presence",
            guardKind: "existsSync-early-return",
          })
        }
      }
      if (skipShaped) {
        for (const ident of collectNonEmptyIdentifiers(node.expression)) {
          emitCollection({
            name: ident.text,
            sense: "true-on-absence",
            guardKind: "existsSync-early-return",
          })
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)

  violations.sort((a, b) => (a.file !== b.file ? (a.file < b.file ? -1 : 1) : a.line - b.line))
  return violations
}
