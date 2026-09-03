import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import type { CssFile } from "../css-source-directives/css-source-directives.module.code.ts"
import { globBase } from "../css-source-directives/css-source-directives.module.code.ts"
import {
  transitiveWorkspaceDeps,
  type WorkspacePackage,
} from "../workspace-packages/workspace-packages.module.code.ts"

export type TailwindViolationKind = "invalid-path" | "missing-source"

export interface TailwindSourceViolation extends Violation {
  readonly app: string
  readonly stylesheet: string
  readonly kind: TailwindViolationKind
  readonly detail: string
}

export type FindTailwindSourcesViolationsInput = {
  readonly packages: readonly WorkspacePackage[]
  readonly cssByPath: ReadonlyMap<string, CssFile>
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

export const enumerateTailwindCandidates = (
  packages: readonly WorkspacePackage[]
): readonly TailwindCandidate[] => {
  const candidates: TailwindCandidate[] = packages.map((one) => ({
    wsPath: one.path,
    wsName: one.name,
  }))
  candidates.sort((a, b) => (a.wsPath < b.wsPath ? -1 : a.wsPath > b.wsPath ? 1 : 0))
  return candidates
}

export const enumerateTailwindApps = (
  cssFiles: readonly CssFile[],
  entryCssPaths: ReadonlySet<string>
): readonly TailwindApp[] => {
  const apps: TailwindApp[] = []
  for (const one of cssFiles) {
    if (!entryCssPaths.has(one.path)) continue
    apps.push({ cssPath: one.path, wsName: one.package })
  }
  apps.sort((a, b) => (a.cssPath < b.cssPath ? -1 : a.cssPath > b.cssPath ? 1 : 0))
  return apps
}

export const examineTailwindApp = (
  app: TailwindApp,
  input: FindTailwindSourcesViolationsInput
): readonly TailwindSourceViolation[] => {
  const { packages, cssByPath, repoRoot, packageSourceRootByName, uiPackageNames } = input
  const { wsName } = app
  if (wsName === null) {
    throw new Error(
      `${app.cssPath} is a Tailwind entry stylesheet owned by no workspace package, so it has no dependency closure to examine`
    )
  }
  const cssFile = cssByPath.get(app.cssPath)
  if (cssFile === undefined) {
    throw new Error(`${app.cssPath} stands as no stylesheet this run read`)
  }
  const cssDirRel = parentDir(app.cssPath)
  const cssDirAbs = `${repoRoot}/${cssDirRel}`

  const out: TailwindSourceViolation[] = []
  const coverageBases: string[] = []
  for (const d of cssFile.directives) {
    if (d.resolvedBase === null) {
      const base = globBase(d.pattern)
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

  for (const depName of transitiveWorkspaceDeps(packages, wsName)) {
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
