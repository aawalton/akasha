import ts from "typescript"
import type { Violation } from "../violation-reporting/violation-reporting.module.code.ts"

export type ParityAxis = "root-hosts" | "provider-graph" | "routes" | "render-targets"

export type ExtractMode = "jsx-components" | "route-paths"

export interface RolePair {
  readonly axis: ParityAxis
  readonly appFile: string
  readonly capacitorFile: string
  readonly mode: ExtractMode
}

export const ROLE_PAIRS: readonly RolePair[] = [
  {
    axis: "root-hosts",
    appFile: "alan/web/root.tsx",
    capacitorFile: "alan/web-capacitor/root.tsx",
    mode: "jsx-components",
  },
  {
    axis: "provider-graph",
    appFile: "alan/web/routes/_app-layout.tsx",
    capacitorFile: "alan/web-capacitor/routes/app-layout.tsx",
    mode: "jsx-components",
  },
  {
    axis: "routes",
    appFile: "alan/web/routes.ts",
    capacitorFile: "alan/web-capacitor/routes.ts",
    mode: "route-paths",
  },
  {
    axis: "render-targets",
    appFile: "alan/web/routes/page-detail.tsx",
    capacitorFile: "alan/web-capacitor/routes/page-detail.tsx",
    mode: "jsx-components",
  },
]

export interface Divergence {
  readonly axis: ParityAxis
  readonly identifier: string
  readonly reason: string
}

export interface ParityViolation extends Violation {
  readonly axis: ParityAxis
  readonly identifier: string
  readonly kind: "undeclared" | "stale"
  readonly message: string
}

function jsxTagIdentifier(tagName: ts.JsxTagNameExpression): string | undefined {
  let expr: ts.Node = tagName
  while (ts.isPropertyAccessExpression(expr)) {
    expr = expr.expression
  }
  if (ts.isIdentifier(expr)) {
    const text = expr.text
    if (
      text.length > 0 &&
      text[0] === text[0]?.toUpperCase() &&
      text[0] !== text[0]?.toLowerCase()
    ) {
      return text
    }
  }
  return undefined
}

function extractJsxComponents(sourceFile: ts.SourceFile): Set<string> {
  const out = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const id = jsxTagIdentifier(node.tagName)
      if (id !== undefined) out.add(id)
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sourceFile)
  return out
}

export interface RouteEntry {
  readonly path: string
  readonly module: string
}

function collectRouteCalls(sourceFile: ts.SourceFile): readonly RouteEntry[] {
  const out: RouteEntry[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "route"
    ) {
      const [first, second] = node.arguments
      if (first !== undefined && ts.isStringLiteralLike(first)) {
        out.push({
          path: first.text,
          module: second !== undefined && ts.isStringLiteralLike(second) ? second.text : "",
        })
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sourceFile)
  return out
}

function extractRoutePaths(sourceFile: ts.SourceFile): Set<string> {
  return new Set(collectRouteCalls(sourceFile).map((entry) => entry.path))
}

function parse(text: string, filePath: string): ts.SourceFile {
  return ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
}

export function extractRouteEntries(text: string, filePath: string): readonly RouteEntry[] {
  return collectRouteCalls(parse(text, filePath))
}

export function hasDefaultExport(text: string, filePath: string): boolean {
  return parse(text, filePath).statements.some((statement) => {
    if (ts.isExportAssignment(statement)) return statement.isExportEquals !== true
    if (
      ts.canHaveModifiers(statement) &&
      ts.getModifiers(statement)?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword) === true
    ) {
      return true
    }
    if (ts.isExportDeclaration(statement) && statement.exportClause !== undefined) {
      const clause = statement.exportClause
      if (ts.isNamedExports(clause)) {
        return clause.elements.some((element) => element.name.text === "default")
      }
    }
    return false
  })
}

export function extractIdentifiers(
  text: string,
  filePath: string,
  mode: ExtractMode
): ReadonlySet<string> {
  const sourceFile = parse(text, filePath)
  return mode === "route-paths" ? extractRoutePaths(sourceFile) : extractJsxComponents(sourceFile)
}

export interface PairSource {
  readonly pair: RolePair
  readonly appText: string
  readonly capText: string
}

export function scanParity(args: {
  readonly sources: readonly PairSource[]
  readonly manifest: readonly Divergence[]
  readonly serverOnlyRoutes: ReadonlySet<string>
}): readonly ParityViolation[] {
  const violations: ParityViolation[] = []
  const appOnlyByAxis = new Map<ParityAxis, ReadonlySet<string>>()

  for (const { pair, appText, capText } of args.sources) {
    const appIds = extractIdentifiers(appText, pair.appFile, pair.mode)
    const capIds = extractIdentifiers(capText, pair.capacitorFile, pair.mode)
    const appOnly = new Set<string>()
    for (const id of appIds) {
      if (capIds.has(id)) continue
      if (pair.axis === "routes" && args.serverOnlyRoutes.has(id)) continue
      appOnly.add(id)
    }
    appOnlyByAxis.set(pair.axis, appOnly)

    const declared = new Set(
      args.manifest.filter((d) => d.axis === pair.axis).map((d) => d.identifier)
    )
    for (const id of appOnly) {
      if (!declared.has(id)) {
        violations.push({
          axis: pair.axis,
          identifier: id,
          kind: "undeclared",
          file: pair.appFile,
          message: `${pair.appFile} has \`${id}\` (${pair.axis}) but app-capacitor (${pair.capacitorFile}) omits it and no divergence is declared — mirror it in the shell, or add a { axis: "${pair.axis}", identifier: "${id}", reason } entry to app-capacitor-parity.divergences.ts`,
        })
      }
    }
  }

  for (const entry of args.manifest) {
    const appOnly = appOnlyByAxis.get(entry.axis)
    if (appOnly !== undefined && !appOnly.has(entry.identifier)) {
      const why =
        entry.axis === "routes" && args.serverOnlyRoutes.has(entry.identifier)
          ? "its module exports no default, so it is a server-only resource route the ssr:false shell can never mount — that class is exempt by rule and needs no entry"
          : "app/ no longer has it, or app-capacitor now mirrors it"
      violations.push({
        axis: entry.axis,
        identifier: entry.identifier,
        kind: "stale",
        message: `declared divergence \`${entry.identifier}\` (${entry.axis}) is no longer app-only — ${why}; remove the stale entry from app-capacitor-parity.divergences.ts`,
      })
    }
  }

  return violations
}
