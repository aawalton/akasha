import { dirname, join, normalize } from "node:path"
import { AGENT_SETTINGS_PATH } from "akasha/agent/seat/supervisors/supervisor-child/modules/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisors/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  landingOf,
  type Naming,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { reachesIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import { textThere } from "akasha/utils/fs/modules/text-there/text-there.module.code.ts"

const SPECIFIER = /from\s+"([^"]*)"/g

const MANIFEST = "package.json"

const WORKSPACES = "workspaces"

const NAMING_NONE: Naming = new Map()

const UNREADABLE = "\u0000unreadable"

function climbFrom(entry: string): readonly string[] {
  const climbing: string[] = []
  let at = dirname(normalize(entry))
  while (!climbing.includes(at)) {
    climbing.push(at)
    at = dirname(at)
  }
  return climbing
}

function namesWorkspaces(text: string): boolean {
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
  read: (path: string) => string | null = textThere
): string | null {
  for (const at of climbFrom(entry)) {
    const text = read(join(at, MANIFEST))
    if (text !== null && namesWorkspaces(text)) return at
  }
  return null
}

export function workspaceNaming(
  root: string,
  read: (path: string) => string | null = textThere
): Naming {
  const text = read(join(root, MANIFEST))
  return text === null ? NAMING_NONE : reachesIn(root, text)
}

let heldNaming: { readonly root: string; readonly said: Naming } | null = null

function namingFrom(entry: string): Naming {
  const root = repoRootOf(entry)
  if (root === null) return NAMING_NONE
  if (heldNaming !== null && heldNaming.root === root) return heldNaming.said
  const said = workspaceNaming(root)
  heldNaming = { root, said }
  return said
}

export function landsAt(here: string, specifier: string, naming: Naming): string | null {
  if (specifier.startsWith(".")) return normalize(join(dirname(here), specifier))
  const named = landingOf(here, specifier, naming)
  return named === null ? null : normalize(named)
}

export type Reaching = {
  readonly reached: readonly string[]
  readonly saidAtEntry: number
  readonly reachedFromEntry: number
}

export function reachingFrom(
  entry: string,
  read: (path: string) => string | null,
  naming: Naming = namingFrom(entry)
): Reaching {
  const from = normalize(entry)
  const seen = new Set<string>()
  const reached: string[] = []
  const landedFromEntry = new Set<string>()
  let saidAtEntry = 0
  const stack = [from]
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
      if (here === from) saidAtEntry++
      const next = landsAt(here, specifier, naming)
      if (next === null) continue
      if (here === from && next !== from) landedFromEntry.add(next)
      stack.push(next)
    }
  }
  const held = new Set(reached)
  let reachedFromEntry = 0
  for (const at of landedFromEntry) if (held.has(at)) reachedFromEntry++
  return { reached: reached.sort(), saidAtEntry, reachedFromEntry }
}

export function reachesNothing(reaching: Reaching): boolean {
  return reaching.saidAtEntry > 0 && reaching.reachedFromEntry === 0
}

const SUPERVISOR_DATA_FILES: readonly string[] = [AGENT_SETTINGS_PATH]

function supervisorFileSet(reaching: Reaching): readonly string[] {
  return [...reaching.reached, ...SUPERVISOR_DATA_FILES].sort()
}

export function reachesNothingLine(entry: string, reaching: Reaching): string {
  return (
    `${LOG} supervisor-files: none of the imports ${entry} names reach a file ` +
    `(0 of ${reaching.saidAtEntry}), so the version this supervisor watches is a hash of that ` +
    "one file and no new version can ever be seen — this supervisor will not self-heal until " +
    "its imports resolve again"
  )
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

let heldWatch: VersionWatch = NOTHING_DELIVERED

export async function pollSupervisorFileVersion(
  entry: string,
  deliver: (version: { liveVersion: string; deployedAt: number }) => void | Promise<void>,
  nowMs: number = Date.now(),
  say: (line: string) => undefined = (line: string): undefined => {
    console.error(line)
  }
): Promise<void> {
  if (entry === "") return
  if (graph === null) {
    const reaching = reachingFrom(entry, textThere)
    if (reaching.reached.length === 0) return
    if (reachesNothing(reaching)) {
      say(reachesNothingLine(entry, reaching))
      return
    }
    graph = supervisorFileSet(reaching)
  }
  const seen = await hashFileSet(graph)
  const verdict = decideVersionDelivery(heldWatch, seen, nowMs)
  heldWatch = verdict.next
  if (!verdict.deliver) return
  await deliver({ liveVersion: seen, deployedAt: nowMs })
}
