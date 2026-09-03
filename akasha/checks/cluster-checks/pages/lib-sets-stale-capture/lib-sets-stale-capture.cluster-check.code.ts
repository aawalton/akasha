#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import {
  FILESYSTEM_WALK_EXEMPT_DIRS,
  findFiles,
} from "../../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { scriptKindFor } from "../../modules/syntax-scanner-entry/syntax-scanner-entry.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[lib-sets-stale-capture]"

const SCAN_PATTERNS: readonly string[] = ["temper/**/*.ts"]

const ROOT_HANDLE = "LibSets"

function parseSource(relPath: string, source: string): ts.SourceFile {
  return ts.createSourceFile(relPath, source, ts.ScriptTarget.Latest, true, scriptKindFor(relPath))
}

function unwrapPassThrough(node: ts.Expression): ts.Expression {
  let current = node
  for (;;) {
    if (ts.isParenthesizedExpression(current)) {
      current = current.expression
      continue
    }
    if (
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isNonNullExpression(current)
    ) {
      current = current.expression
      continue
    }
    if (ts.isCallExpression(current) && current.arguments.length === 1) {
      const only = current.arguments[0]
      if (only !== undefined && !ts.isSpreadElement(only)) {
        current = only
        continue
      }
    }
    return current
  }
}

function capturedFieldOf(node: ts.Expression, handles: ReadonlySet<string>): string | undefined {
  const target = unwrapPassThrough(node)
  if (ts.isPropertyAccessExpression(target) && ts.isIdentifier(target.expression)) {
    return handles.has(target.expression.text) ? target.name.text : undefined
  }
  if (
    ts.isElementAccessExpression(target) &&
    ts.isIdentifier(target.expression) &&
    ts.isStringLiteralLike(target.argumentExpression)
  ) {
    return handles.has(target.expression.text) ? target.argumentExpression.text : undefined
  }
  return undefined
}

function isHandleAlias(node: ts.Expression, handles: ReadonlySet<string>): boolean {
  const target = unwrapPassThrough(node)
  return ts.isIdentifier(target) && handles.has(target.text)
}

function destructuredFieldOf(element: ts.BindingElement): string | undefined {
  const nameNode = element.propertyName ?? element.name
  if (ts.isIdentifier(nameNode)) return nameNode.text
  if (ts.isStringLiteralLike(nameNode)) return nameNode.text
  return undefined
}

interface ModuleScopeCapture {
  readonly binding: string
  readonly field: string
  readonly line: number
  readonly column: number
}

interface ModuleScope {
  readonly handles: ReadonlySet<string>
  readonly captures: readonly ModuleScopeCapture[]
}

function collectModuleScope(sourceFile: ts.SourceFile): ModuleScope {
  const handles = new Set<string>([ROOT_HANDLE])
  const captures: ModuleScopeCapture[] = []
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      const initializer = declaration.initializer
      if (initializer === undefined) continue
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(
        declaration.getStart(sourceFile)
      )
      const at = { line: line + 1, column: character + 1 }
      if (ts.isIdentifier(declaration.name)) {
        if (isHandleAlias(initializer, handles)) {
          handles.add(declaration.name.text)
          continue
        }
        const field = capturedFieldOf(initializer, handles)
        if (field !== undefined) {
          captures.push({ binding: declaration.name.text, field, ...at })
        }
        continue
      }
      if (!ts.isObjectBindingPattern(declaration.name)) continue
      if (!isHandleAlias(initializer, handles)) continue
      for (const element of declaration.name.elements) {
        const field = destructuredFieldOf(element)
        if (field === undefined || !ts.isIdentifier(element.name)) continue
        captures.push({ binding: element.name.text, field, ...at })
      }
    }
  }
  return { handles, captures }
}

function opensFunctionBody(node: ts.Node): boolean {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node)
  )
}

export interface ModuleAnalysis {
  readonly runtimeRebinds: ReadonlySet<string>
  readonly faithfulWriteBacks: ReadonlyMap<string, ReadonlySet<string>>
  readonly captures: readonly ModuleScopeCapture[]
}

const EMPTY_ANALYSIS: ModuleAnalysis = {
  runtimeRebinds: new Set<string>(),
  faithfulWriteBacks: new Map<string, ReadonlySet<string>>(),
  captures: [],
}

export function analyzeModule(args: {
  readonly source: string
  readonly relPath: string
}): ModuleAnalysis {
  const { source, relPath } = args
  if (!source.includes(ROOT_HANDLE)) return EMPTY_ANALYSIS
  const sourceFile = parseSource(relPath, source)
  const { handles, captures } = collectModuleScope(sourceFile)

  const selfCaptures = new Map<string, Set<string>>()
  for (const capture of captures) {
    const bindings = selfCaptures.get(capture.field) ?? new Set<string>()
    bindings.add(capture.binding)
    selfCaptures.set(capture.field, bindings)
  }

  const runtimeRebinds = new Set<string>()
  const faithfulWriteBacks = new Map<string, Set<string>>()
  const visit = (node: ts.Node, insideFunction: boolean): undefined => {
    if (
      insideFunction &&
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      const field = capturedFieldOf(node.left, handles)
      if (field !== undefined) {
        runtimeRebinds.add(field)
        const rhs = unwrapPassThrough(node.right)
        if (ts.isIdentifier(rhs) && selfCaptures.get(field)?.has(rhs.text) === true) {
          const names = faithfulWriteBacks.get(field) ?? new Set<string>()
          names.add(rhs.text)
          faithfulWriteBacks.set(field, names)
        }
      }
    }
    const deeper = insideFunction || opensFunctionBody(node)
    ts.forEachChild(node, (child) => visit(child, deeper))
    return undefined
  }
  visit(sourceFile, false)

  return { runtimeRebinds, faithfulWriteBacks, captures }
}

export interface StaleCaptureViolation extends Violation {
  readonly kind: "lib-sets-stale-capture"
  readonly file: string
  readonly line: number
  readonly column: number
  readonly binding: string
  readonly field: string
  readonly message: string
}

function messageFor(capture: ModuleScopeCapture): string {
  return (
    `module-scope \`${capture.binding}\` captures \`LibSets.${capture.field}\`, a field some module rebinds ` +
    "at runtime (it assigns a freshly-built table onto that field from inside a function, after every " +
    "module has been evaluated). A field rebind is not visible through a captured " +
    "reference, so this binding keeps pointing at the pre-load table nothing writes to again, and the getter " +
    "returns a non-nil EMPTY table — no data and broken reader look identical. Read " +
    `\`lib.${capture.field}\` inside the function, on every call, and apply the cast there.`
  )
}

export function scanStaleCaptures(args: {
  readonly source: string
  readonly relPath: string
  readonly reboundFields: ReadonlySet<string>
}): readonly StaleCaptureViolation[] {
  const { source, relPath, reboundFields } = args
  const { captures, faithfulWriteBacks } = analyzeModule({ source, relPath })
  const violations: StaleCaptureViolation[] = []
  for (const capture of captures) {
    if (!reboundFields.has(capture.field)) continue
    if (faithfulWriteBacks.get(capture.field)?.has(capture.binding) === true) continue
    violations.push({
      kind: "lib-sets-stale-capture",
      file: relPath,
      line: capture.line,
      column: capture.column,
      binding: capture.binding,
      field: capture.field,
      message: messageFor(capture),
    })
  }
  return violations
}

export function isOutOfScope(relPath: string): boolean {
  if (!relPath.endsWith(".ts")) return true
  if (relPath.endsWith(".d.ts")) return true
  if (relPath.includes("/dist/")) return true
  if (relPath.includes("/node_modules/")) return true
  if (relPath.split("/").some((segment) => FILESYSTEM_WALK_EXEMPT_DIRS.has(segment))) return true
  return false
}

function deriveRuntimeRebinds(args: {
  readonly repoRoot: string
  readonly files: readonly string[]
}): ReadonlySet<string> {
  const rebound = new Set<string>()
  for (const rel of args.files) {
    const source = readFileSync(`${args.repoRoot}/${rel}`, "utf8")
    for (const field of analyzeModule({ source, relPath: rel }).runtimeRebinds) rebound.add(field)
  }
  if (rebound.size === 0) {
    throw new Error(
      `derived zero runtime-rebound fields from ${args.files.length} Temper source file(s) under ` +
        `${args.repoRoot} — the derivation is broken, and a gate with an empty rule passes everything. ` +
        "Fix the derivation before trusting a green run."
    )
  }
  return rebound
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot !== undefined ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const files = findFiles({ cwd: repoRoot, patterns: SCAN_PATTERNS, absolute: false }).filter(
    (rel) => !isOutOfScope(rel)
  )
  const reboundFields = deriveRuntimeRebinds({ repoRoot, files })
  const { population, violations } = examineFilePopulation<StaleCaptureViolation>({
    files,
    unit: "Temper source files",
    membership: {
      kind: "enumerated",
      because:
        "the members come from a `findFiles` glob of SCAN_PATTERNS under repoRoot, and `Bun.Glob.scanSync` " +
        "raises ENOENT on a root that is not there — and main() has already refused a repoRoot that does not " +
        "exist — so fewer files means fewer Temper .ts files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => scanStaleCaptures({ source, relPath: rel, reboundFields }),
  })

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        `module-scope capture(s) of a LibSets field some module rebinds at runtime (${reboundFields.size} ` +
        "such field(s) derived from the scanned tree). A runtime rebind ASSIGNS a fresh table onto the " +
        "field, which a reference captured at module-evaluation time can never see — the binding stays " +
        "pinned to the pre-load table and its getter returns a non-nil empty one",
      successMessage: `No module-scope capture of any of the ${reboundFields.size} LibSets field(s) rebound at runtime.`,
      groupBy: (v) => v.file,
      formatViolation: (v) => `${v.line}:${v.column} \`${v.binding}\` — ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
    process.exit(2)
  }
}
