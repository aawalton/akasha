import {
  CSS_FILE_NODE_TYPE,
  CssFileAttrsSchema,
  cssFileNodeId,
} from "../../../../../instructions/tools/lib/graph/producers/file/css-file/types.ts"
import {
  PACKAGE_NODE_TYPE,
  PackageAttrsSchema,
  packageNodeId,
  PKG_DEPENDS_EDGE_TYPE,
} from "../../../../../instructions/tools/lib/graph/producers/package/types.ts"
import { transitiveClosure } from "../../../../../instructions/tools/lib/graph/queries/transitive.ts"
import type { Graph } from "../../../../../instructions/tools/lib/graph/types.ts"
import type { Violation } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const CODE_REPO = "code"

export type TailwindViolationKind = "invalid-path" | "missing-source"

export interface TailwindSourceViolation extends Violation {
  readonly app: string
  readonly stylesheet: string
  readonly kind: TailwindViolationKind
  readonly detail: string
}

export type FindTailwindSourcesViolationsInput = {
  readonly graph: Graph
  readonly repoRoot: string
  readonly packageSourceRootByName: ReadonlyMap<string, string>
  readonly uiPackageNames: ReadonlySet<string>
  readonly entryCssPaths: ReadonlySet<string>
}

export interface TailwindCandidate {
  readonly wsPath: string
  readonly wsName: string
}

export interface TailwindApp {
  readonly cssPath: string
  readonly wsName: string | null
}

export const enumerateTailwindCandidates = (graph: Graph): readonly TailwindCandidate[] => {
  const candidates: TailwindCandidate[] = []
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = PackageAttrsSchema.parse(node.attrs)
    candidates.push({ wsPath: attrs.path, wsName: attrs.name })
  }
  candidates.sort((a, b) => (a.wsPath < b.wsPath ? -1 : a.wsPath > b.wsPath ? 1 : 0))
  return candidates
}

export const enumerateTailwindApps = (
  graph: Graph,
  entryCssPaths: ReadonlySet<string>
): readonly TailwindApp[] => {
  const apps: TailwindApp[] = []
  for (const node of graph.nodes(CSS_FILE_NODE_TYPE)) {
    if (node.repo !== CODE_REPO) continue
    const attrs = CssFileAttrsSchema.parse(node.attrs)
    if (!entryCssPaths.has(attrs.path)) continue
    apps.push({ cssPath: attrs.path, wsName: attrs.package })
  }
  apps.sort((a, b) => (a.cssPath < b.cssPath ? -1 : a.cssPath > b.cssPath ? 1 : 0))
  return apps
}

const workspaceDepNames = (graph: Graph, wsName: string): readonly string[] => {
  const seed = packageNodeId(wsName)
  if (graph.node(seed) === undefined) return []
  const reached = transitiveClosure(graph, seed, { edgeTypes: [PKG_DEPENDS_EDGE_TYPE] })
  const names: string[] = []
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    if (node.repo !== CODE_REPO) continue
    names.push(PackageAttrsSchema.parse(node.attrs).name)
  }
  names.sort()
  return names
}

export const examineTailwindApp = (
  app: TailwindApp,
  input: FindTailwindSourcesViolationsInput
): readonly TailwindSourceViolation[] => {
  const { graph, repoRoot, packageSourceRootByName, uiPackageNames } = input
  const { wsName } = app
  if (wsName === null) {
    throw new Error(
      `${app.cssPath} is a Tailwind entry stylesheet owned by no workspace package, so it has no dependency closure to examine`
    )
  }
  const cssNode = graph.node(cssFileNodeId(app.cssPath))
  if (cssNode === undefined) {
    throw new Error(`${app.cssPath} has no css-file node in the graph`)
  }
  const cssAttrs = CssFileAttrsSchema.parse(cssNode.attrs)
  const cssDirRel = parentDir(app.cssPath)
  const cssDirAbs = `${repoRoot}/${cssDirRel}`

  const out: TailwindSourceViolation[] = []
  const coverageBases: string[] = []
  for (const d of cssAttrs.directives) {
    if (d.resolvedBase === null) {
      const base = globBaseLocal(d.pattern)
      const abs = posixResolve(cssDirAbs, base)
      out.push({
        app: wsName,
        stylesheet: app.cssPath,
        kind: "invalid-path",
        detail: `line ${d.line}: ${d.pattern} → ${abs} (does not exist)`,
      })
      continue
    }
    if (d.negated) continue
    coverageBases.push(d.resolvedBase)
  }

  for (const depName of workspaceDepNames(graph, wsName)) {
    if (depName === wsName) continue
    if (!uiPackageNames.has(depName)) continue
    const depSrc = packageSourceRootByName.get(depName)
    if (depSrc === undefined) continue
    const covered = coverageBases.some((base) => coversBidirectional(base, depSrc))
    if (covered) continue
    const relFromCss = posixRelative(cssDirRel, depSrc)
    const tail = "/**/*.{ts,tsx}"
    out.push({
      app: wsName,
      stylesheet: app.cssPath,
      kind: "missing-source",
      detail: `${depName} is a UI dep; add: @source "${relFromCss}${tail}";`,
    })
  }
  return out
}

const coversBidirectional = (a: string, b: string): boolean => {
  if (a === b) return true
  if (a.startsWith(`${b}/`)) return true
  if (b.startsWith(`${a}/`)) return true
  return false
}

const parentDir = (relPath: string): string => {
  const idx = relPath.lastIndexOf("/")
  return idx === -1 ? "" : relPath.slice(0, idx)
}

const posixResolve = (from: string, to: string): string => {
  const startAbs = from.startsWith("/")
  const segs: string[] = []
  for (const part of (startAbs ? from.slice(1) : from).split("/")) {
    if (part === "" || part === ".") continue
    segs.push(part)
  }
  for (const part of to.split("/")) {
    if (part === "" || part === ".") continue
    if (part === "..") {
      segs.pop()
      continue
    }
    segs.push(part)
  }
  return startAbs ? `/${segs.join("/")}` : segs.join("/")
}

const posixRelative = (from: string, to: string): string => {
  const fromSegs = from === "" ? [] : from.split("/")
  const toSegs = to === "" ? [] : to.split("/")
  let common = 0
  while (
    common < fromSegs.length &&
    common < toSegs.length &&
    fromSegs[common] === toSegs[common]
  ) {
    common++
  }
  const up = fromSegs.length - common
  const down = toSegs.slice(common)
  const parts: string[] = []
  for (let i = 0; i < up; i++) parts.push("..")
  for (const seg of down) parts.push(seg)
  return parts.length === 0 ? "." : parts.join("/")
}

const globBaseLocal = (pattern: string): string => {
  const parts = pattern.split("/")
  const baseParts: string[] = []
  for (const p of parts) {
    if (p.includes("*") || p.includes("{") || p.includes("?")) break
    baseParts.push(p)
  }
  return baseParts.join("/")
}
