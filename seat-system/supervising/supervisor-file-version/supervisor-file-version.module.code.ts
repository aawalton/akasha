import { readFileSync } from "node:fs"
import { dirname, join, normalize } from "node:path"
import type { Naming } from "@akasha/code-system/code-specifier"
import { reachesIn, reachingOver } from "@akasha/code-system/package-manifest"
import { AGENT_SETTINGS_PATH } from "@akasha/seat-system/supervisor-spawn-settings"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"

const SPECIFIER = /from\s+"([^"]*)"/g

const MANIFEST = "package.json"

const WORKSPACES = "workspaces"

const NAMING_NONE: Naming = new Map()

const UNREADABLE = "\u0000unreadable"

export function readTextOrNull(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

function climbFrom(entry: string): readonly string[] {
  const climbing: string[] = []
  let at = dirname(normalize(entry))
  while (!climbing.includes(at)) {
    climbing.push(at)
    at = dirname(at)
  }
  return climbing
}

export function namesWorkspaces(text: string): boolean {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return false
  }
  if (read === null || typeof read !== "object") return false
  return Array.isArray((read as Record<string, unknown>)[WORKSPACES])
}

export function repoRootOf(
  entry: string,
  read: (path: string) => string | null = readTextOrNull
): string | null {
  for (const at of climbFrom(entry)) {
    const text = read(join(at, MANIFEST))
    if (text !== null && namesWorkspaces(text)) return at
  }
  return null
}

export function workspaceNaming(
  root: string,
  read: (path: string) => string | null = readTextOrNull
): Naming {
  let dirs: readonly string[]
  try {
    dirs = listWorkspaceDirs(root)
  } catch {
    return NAMING_NONE
  }
  const found: ReadonlyMap<string, string>[] = []
  for (const dir of dirs) {
    const at = join(root, dir)
    const text = read(join(at, MANIFEST))
    if (text !== null) found.push(reachesIn(at, text))
  }
  return reachingOver(found)
}

let held: { readonly root: string; readonly said: Naming } | null = null

function namingFrom(entry: string): Naming {
  const root = repoRootOf(entry)
  if (root === null) return NAMING_NONE
  if (held !== null && held.root === root) return held.said
  const said = workspaceNaming(root)
  held = { root, said }
  return said
}

export function landsAt(here: string, specifier: string, naming: Naming): string | null {
  if (specifier.startsWith(".")) return normalize(join(dirname(here), specifier))
  const named = naming.get(specifier)
  return named === undefined ? null : normalize(named)
}

export function importGraph(
  entry: string,
  read: (path: string) => string | null,
  naming: Naming = namingFrom(entry)
): readonly string[] {
  const seen = new Set<string>()
  const reached: string[] = []
  const stack = [normalize(entry)]
  while (stack.length > 0) {
    const here = stack.pop()
    if (here === undefined || seen.has(here)) continue
    seen.add(here)
    const text = read(here)
    if (text === null) continue
    reached.push(here)
    for (const found of text.matchAll(SPECIFIER)) {
      const specifier = found[1]
      if (specifier === undefined) continue
      const next = landsAt(here, specifier, naming)
      if (next !== null) stack.push(next)
    }
  }
  return reached.sort()
}

export const SUPERVISOR_DATA_FILES: readonly string[] = [AGENT_SETTINGS_PATH]

export function supervisorFileSet(
  entry: string,
  read: (path: string) => string | null = readTextOrNull,
  naming: Naming = namingFrom(entry)
): readonly string[] {
  const reached = importGraph(entry, read, naming)
  if (reached.length === 0) return []
  return [...reached, ...SUPERVISOR_DATA_FILES].sort()
}

export async function hashFileSet(files: readonly string[]): Promise<string> {
  const hasher = new Bun.CryptoHasher("sha256")
  for (const path of files) {
    hasher.update(path)
    try {
      hasher.update(await Bun.file(path).bytes())
    } catch {
      hasher.update(UNREADABLE)
    }
  }
  return hasher.digest("hex")
}

export const DEBOUNCE_MS = 180_000

export const CEILING_MS = 900_000

export type VersionWatch = {
  readonly delivered: string | null
  readonly steady: { readonly version: string; readonly sinceMs: number } | null
  readonly changedSinceMs: number | null
}

export const NOTHING_DELIVERED: VersionWatch = {
  delivered: null,
  steady: null,
  changedSinceMs: null,
}

export function decideVersionDelivery(
  watch: VersionWatch,
  seen: string,
  nowMs: number
): { readonly next: VersionWatch; readonly deliver: boolean } {
  const settledOn = (version: string): VersionWatch => ({
    delivered: version,
    steady: null,
    changedSinceMs: null,
  })
  if (watch.delivered === null) return { next: settledOn(seen), deliver: true }
  if (seen === watch.delivered) return { next: settledOn(seen), deliver: false }
  const steady =
    watch.steady !== null && watch.steady.version === seen
      ? watch.steady
      : { version: seen, sinceMs: nowMs }
  const changedSinceMs = watch.changedSinceMs ?? nowMs
  const held = nowMs - steady.sinceMs >= DEBOUNCE_MS
  const overdue = nowMs - changedSinceMs >= CEILING_MS
  if (held || overdue) return { next: settledOn(seen), deliver: true }
  return { next: { delivered: watch.delivered, steady, changedSinceMs }, deliver: false }
}

let graph: readonly string[] | null = null

let watch: VersionWatch = NOTHING_DELIVERED

export async function pollSupervisorFileVersion(
  entry: string,
  deliver: (version: { liveVersion: string; deployedAt: number }) => void | Promise<void>,
  nowMs: number = Date.now()
): Promise<void> {
  if (entry === "") return
  graph ??= supervisorFileSet(entry)
  if (graph.length === 0) {
    graph = null
    return
  }
  const seen = await hashFileSet(graph)
  const verdict = decideVersionDelivery(watch, seen, nowMs)
  watch = verdict.next
  if (!verdict.deliver) return
  await deliver({ liveVersion: seen, deployedAt: nowMs })
}

export function _resetSupervisorFileGraphForTesting(): undefined {
  graph = null
  watch = NOTHING_DELIVERED
}
