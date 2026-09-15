import { join, relative } from "node:path"
import { AGENT_SETTINGS_PATH } from "akasha/agent/seat/supervisor/supervisor-child/modules/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports.graph-predicate.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const UNREADABLE = "\u0000unreadable"

export function reachedFrom(entry: string, root: string = ownRepoRoot()): readonly string[] {
  const bodyAt = (path: string): string | null => textThere(join(root, path))
  return closureOf(imports, [relative(root, entry)], {
    index: shadowAt(root).index,
    bodyAt,
    through: (path) => bodyAt(path) !== null,
  })
}

export function reachesNothing(reached: readonly string[]): boolean {
  return reached.length < 2
}

const SUPERVISOR_DATA_FILES: readonly string[] = [AGENT_SETTINGS_PATH]

function supervisorFileSet(root: string, reached: readonly string[]): readonly string[] {
  return [...reached.map((at) => join(root, at)), ...SUPERVISOR_DATA_FILES].sort()
}

export function reachesNothingLine(entry: string): string {
  return (
    `${LOG} supervisor-files: the closure over the imports ${entry} names reaches no file but ` +
    `${entry} itself, so the version this supervisor watches is a hash of that one file and no ` +
    "new version can ever be seen — this supervisor will not self-heal until its imports " +
    "resolve again"
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

let heldFiles: readonly string[] | null = null

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
  if (heldFiles === null) {
    const root = ownRepoRoot()
    const reached = reachedFrom(entry, root)
    if (reachesNothing(reached)) {
      say(reachesNothingLine(entry))
      return
    }
    heldFiles = supervisorFileSet(root, reached)
  }
  const seen = await hashFileSet(heldFiles)
  const verdict = decideVersionDelivery(heldWatch, seen, nowMs)
  heldWatch = verdict.next
  if (!verdict.deliver) return
  await deliver({ liveVersion: seen, deployedAt: nowMs })
}
