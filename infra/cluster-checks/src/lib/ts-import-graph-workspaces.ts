import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { WorkspaceGlobs } from "../../../../tools/lib/graph/producers/file/ts-file/discover.ts"
import { listWorkspaceDirs } from "../../../../tools/lib/check-workflow/workspace-paths.ts"
import { z } from "zod"
import type { KnipRoot, KnipWorkspaceEntry, WorkspaceConfig } from "./ts-import-graph-types"

const KNIP_WORKSPACE_ENTRY_SCHEMA = z
  .object({
    entry: z.array(z.string()).optional(),
    project: z.array(z.string()).optional(),
    ignore: z.array(z.string()).optional(),
  })
  .passthrough()

const KNIP_ROOT_SCHEMA = z
  .object({
    workspaces: z.record(z.string(), KNIP_WORKSPACE_ENTRY_SCHEMA).optional(),
    ignoreWorkspaces: z.array(z.string()).optional(),
  })
  .passthrough()

function parseRelaxedJsonRaw(raw: string): unknown {
  const stripped = stripCommentsOutsideStrings(raw)
  const noTrailingCommas = stripped.replace(/,(\s*[}\]])/g, "$1")
  return z.unknown().parse(JSON.parse(noTrailingCommas))
}

function stripCommentsOutsideStrings(s: string): string {
  let out = ""
  let i = 0
  let inString = false
  while (i < s.length) {
    const c = s[i]
    const n = s[i + 1]
    if (inString) {
      out += c
      if (c === "\\" && i + 1 < s.length) {
        out += s[i + 1]
        i += 2
        continue
      }
      if (c === '"') inString = false
      i++
      continue
    }
    if (c === '"') {
      inString = true
      out += c
      i++
      continue
    }
    if (c === "/" && n === "/") {
      while (i < s.length && s[i] !== "\n") i++
      continue
    }
    if (c === "/" && n === "*") {
      i += 2
      while (i + 1 < s.length && !(s[i] === "*" && s[i + 1] === "/")) i++
      i += 2
      continue
    }
    out += c
    i++
  }
  return out
}

export function readWorkspacesFromKnip(
  knipJsonPath: string,
  repoRoot: string
): readonly WorkspaceConfig[] {
  const raw = readFileSync(knipJsonPath, "utf-8")
  const parsed: KnipRoot = KNIP_ROOT_SCHEMA.parse(parseRelaxedJsonRaw(raw))
  const out: WorkspaceConfig[] = []
  const workspaces = parsed.workspaces ?? {}
  for (const [wsPath, ws] of Object.entries(workspaces)) {
    const root = wsPath === "." ? "" : wsPath
    const absRoot = resolve(repoRoot, root)
    const tsconfigPath = resolve(absRoot, "tsconfig.json")
    out.push({
      root,
      entries: ws.entry ?? [],
      project: ws.project ?? [],
      ignore: ws.ignore ?? [],
      tsconfigPath,
      audited: true,
    })
  }
  return out
}

function widenTsGlobs(globs: readonly string[]): readonly string[] {
  return globs.map((g) => {
    const suffix = g.endsWith("!") ? "!" : ""
    const base = suffix !== "" ? g.slice(0, -1) : g
    if (base.includes(".tsx") || base.includes("{ts,tsx}")) return g
    if (base.endsWith(".ts")) return `${base.slice(0, -3)}.{ts,tsx}${suffix}`
    return g
  })
}

export type UncuratedWorkspacePolicy = "skip" | "consumer" | "default-globs"

const CONSUMER_GLOBS: readonly string[] = ["**/*.{ts,tsx}"]

export const DEFAULT_WORKSPACE_GLOBS: WorkspaceGlobs = {
  entry: ["src/**/*.{ts,tsx}"],
  project: ["**/*.{ts,tsx}"],
  ignore: [],
}

export function readWorkspacesFromPackageJson(
  knipJsonPath: string | null,
  repoRoot: string,
  uncuratedPolicy: UncuratedWorkspacePolicy = "skip"
): readonly WorkspaceConfig[] {
  const workspacePaths = listWorkspaceDirs(repoRoot)

  let knipWorkspaces: Record<string, KnipWorkspaceEntry> = {}
  if (knipJsonPath != null && existsSync(knipJsonPath)) {
    const knipRaw = readFileSync(knipJsonPath, "utf-8")
    const knip: KnipRoot = KNIP_ROOT_SCHEMA.parse(parseRelaxedJsonRaw(knipRaw))
    knipWorkspaces = knip.workspaces ?? {}
  }

  const defaultEntry = DEFAULT_WORKSPACE_GLOBS.entry
  const defaultProject = DEFAULT_WORKSPACE_GLOBS.project
  const hasKnip = Object.keys(knipWorkspaces).length > 0

  const out: WorkspaceConfig[] = []

  const rootTsconfig = resolve(repoRoot, "tsconfig.json")
  if (existsSync(rootTsconfig)) {
    const knipRoot = knipWorkspaces["."]
    if (knipRoot || !hasKnip) {
      out.push({
        root: "",
        entries: knipRoot?.entry ?? defaultEntry,
        project: widenTsGlobs(knipRoot?.project ?? defaultProject),
        ignore: knipRoot?.ignore ?? [],
        tsconfigPath: rootTsconfig,
        audited: true,
      })
    }
  }

  for (const wsPath of workspacePaths) {
    const absRoot = resolve(repoRoot, wsPath)
    const tsconfigPath = resolve(absRoot, "tsconfig.json")
    if (!existsSync(tsconfigPath)) continue

    const knipEntry = knipWorkspaces[wsPath]
    const uncurated = !knipEntry && hasKnip
    if (uncurated && uncuratedPolicy === "skip") {
      console.warn(
        `[ts-import-graph] skipping workspace "${wsPath}" — no entry in ast-unused.config.json; add curated entry/project globs to analyze it`
      )
      continue
    }
    const asConsumer = uncurated && uncuratedPolicy === "consumer"

    out.push({
      root: wsPath,
      entries: asConsumer ? CONSUMER_GLOBS : (knipEntry?.entry ?? defaultEntry),
      project: asConsumer ? CONSUMER_GLOBS : widenTsGlobs(knipEntry?.project ?? defaultProject),
      ignore: knipEntry?.ignore ?? [],
      tsconfigPath,
      audited: !asConsumer,
    })
  }

  return out
}

export function readIgnoreWorkspaces(knipJsonPath: string | null): ReadonlySet<string> {
  if (knipJsonPath == null || !existsSync(knipJsonPath)) return new Set()
  const raw = readFileSync(knipJsonPath, "utf-8")
  const knip: KnipRoot = KNIP_ROOT_SCHEMA.parse(parseRelaxedJsonRaw(raw))
  return new Set(knip.ignoreWorkspaces ?? [])
}
