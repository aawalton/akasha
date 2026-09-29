import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  addedLogged,
  bodyCommitted,
  type Commit,
  commitsLogged,
} from "akasha/command/pages/story/turn/modules/turn-commits/turn-commits.module.code.ts"
import type {
  Rewinding,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { textOnDisk } from "akasha/file/system/modules/text-on-disk/text-on-disk.module.code.ts"
import { appendOnlyIn } from "akasha/page/index/modules/file-appending/file-appending.module.code.ts"
import { facingOn } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { shapesFiled } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { PLAYER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const WORLD = "world"

const STORIES = "stories/"

const PAGE_ENDING = ".ts"

const UNCOMMITTED = ".uncommitted."

const TO_PLAYER = ` to ${PLAYER}`

const MOVES = " moves from "

const HEAD = "HEAD"

const TURN_FILE = ".story-turn-played."

const ENGINE: readonly RegExp[] = [
  /\.(code|test|test-fixtures)\.tsx?$/,
  /\.page-type(\.types)?\.ts$/,
  /\.page-type\.schema\.jsonl$/,
  /\/mechanics\/checks\//,
]

export type Folders = { readonly story: string; readonly world: string }

export type TurnUndoing = {
  readonly foldersOf: (root: string, game: string) => Folders | null
  readonly commitsOn: (root: string, range: string, within: readonly string[]) => readonly Commit[]
  readonly addedOn: (root: string, path: string) => string | null
  readonly bodyThen: (root: string, commit: string, path: string) => string | null
  readonly bodyNow: (root: string, path: string) => string | null
  readonly besideOnDisk: (root: string, turn: string) => readonly string[]
  readonly appendsOnly: (root: string, path: string) => boolean
}

function appendOnlyAt(root: string, path: string): boolean {
  try {
    return appendOnlyIn(facingOn(root), path)
  } catch {
    return false
  }
}

function foldersIndexed(root: string, game: string): Folders | null {
  const story = listedAt(root, storyPlayed.slug, game)[0]
  const value = story === undefined ? null : valueAt(story.path, root)
  const named = value === null ? null : textAt(value, WORLD)
  const address = named === null ? null : addressIn(named)
  if (story === undefined || address?.kind !== "qualified") return null
  const world = listedAt(root, address.pageTypeSlug, address.slug)[0]
  if (world === undefined) return null
  return { story: `${dirname(story.path)}/`, world: `${dirname(world.path)}/` }
}

export function besideListed(root: string, turn: string): readonly string[] {
  const folder = dirname(turn)
  const opening = `${turn.slice(folder.length + 1, -PAGE_ENDING.length)}.`
  return readdirSync(join(root, folder), { withFileTypes: true })
    .filter((one) => one.isFile() && one.name.startsWith(opening))
    .filter((one) => !one.name.includes(UNCOMMITTED))
    .map((one) => `${folder}/${one.name}`)
}

export const TURN_UNDOING: TurnUndoing = {
  foldersOf: foldersIndexed,
  commitsOn: commitsLogged,
  addedOn: addedLogged,
  bodyThen: bodyCommitted,
  bodyNow: (root, path) => textOnDisk(join(root, path)),
  besideOnDisk: besideListed,
  appendsOnly: appendOnlyAt,
}

export type Refused = { readonly refused: string }

type Making = { readonly made: string; readonly moved: string }

export function makingOf(
  turn: Turn,
  made: string | null,
  history: readonly Commit[],
  published: boolean
): Making | Refused {
  if (made === null) return { refused: `no commit added \`${turn.at}\`` }
  if (!published) return { made, moved: HEAD }
  const since = history.findIndex((one) => one.commit === made)
  const moved = history
    .slice(0, since === -1 ? history.length : since)
    .find(
      (one) => one.subject.startsWith(`${turn.slug}${MOVES}`) && one.subject.endsWith(TO_PLAYER)
    )
  if (moved === undefined) return { refused: `no commit moved \`${turn.slug}\` to ${PLAYER}` }
  return { made, moved: moved.commit }
}

function derived(path: string): boolean {
  return referencesFiled(path) || shapesFiled(path)
}

export function engineAt(path: string): boolean {
  return ENGINE.some((one) => one.test(path))
}

export type Restored = {
  readonly path: string
  readonly body: string | null
  readonly whole?: true
}

export type Undoing = {
  readonly commits: readonly Commit[]
  readonly restored: readonly Restored[]
}

export function otherTurnAt(turn: string, path: string): boolean {
  if (!path.includes(TURN_FILE) || dirname(path) !== dirname(turn)) return false
  return !path.startsWith(`${turn.slice(0, -PAGE_ENDING.length)}.`)
}

function scopedIn(
  folders: Folders,
  turn: string,
  path: string
): "story" | "world" | "other" | null {
  if (derived(path) || engineAt(path) || otherTurnAt(turn, path)) return null
  if (path.startsWith(folders.story)) return "story"
  if (!path.startsWith(folders.world)) return null
  return path.startsWith(`${folders.world}${STORIES}`) ? "other" : "world"
}

type Run = {
  readonly commits: readonly Commit[]
  readonly touched: ReadonlySet<string>
  readonly others: readonly string[]
}

function runIn(run: readonly Commit[], folders: Folders, turn: string): Run {
  const touched = new Set<string>()
  const others: string[] = []
  const commits: Commit[] = []
  for (const one of run) {
    const scoped = one.paths.filter((path) => {
      const scope = scopedIn(folders, turn, path)
      if (scope === "other") others.push(path)
      return scope === "story" || scope === "world"
    })
    if (scoped.length > 0) commits.push({ ...one, paths: scoped })
    for (const path of scoped) touched.add(path)
  }
  return { commits, touched, others }
}

export function undoingOf(
  reach: TurnUndoing,
  root: string,
  turn: Turn,
  folders: Folders,
  published = true
): Undoing | Refused {
  try {
    return undoingRead(reach, root, turn, folders, published)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { refused: `git could not read the history of \`${turn.at}\` here: ${why}` }
  }
}

function undoingRead(
  reach: TurnUndoing,
  root: string,
  turn: Turn,
  folders: Folders,
  published: boolean
): Undoing | Refused {
  const history = reach.commitsOn(root, HEAD, [turn.at])
  const making = makingOf(turn, reach.addedOn(root, turn.at), history, published)
  if ("refused" in making) return making
  const since = published ? `\`${turn.slug}\` moved to ${PLAYER}` : "the latest commit"
  const before = `${making.made}^`
  const logged = reach.commitsOn(root, `${before}..${making.moved}`, [folders.world, folders.story])
  const run = runIn(logged, folders, turn.at)
  const worldly = [...run.touched].find((path) => !path.startsWith(folders.story))
  const other = run.others[0]
  if (worldly !== undefined && other !== undefined) {
    return {
      refused: `\`${other}\`, of another story, changed while \`${turn.slug}\` was made, so \`${worldly}\` may have changed for that story rather than this turn`,
    }
  }
  const touched = new Set(run.touched)
  for (const path of reach.besideOnDisk(root, turn.at)) if (!derived(path)) touched.add(path)
  const restored: Restored[] = []
  for (const path of [...touched].sort()) {
    const now = reach.bodyNow(root, path)
    if (now !== reach.bodyThen(root, making.moved, path)) {
      return {
        refused: `\`${path}\` changed since ${since}, so going back to its body before the turn would undo that change too`,
      }
    }
    const then = reach.bodyThen(root, before, path)
    if (then === now) continue
    const whole = then !== null && now !== null && reach.appendsOnly(root, path)
    restored.push(whole ? { path, body: then, whole } : { path, body: then })
  }
  return { commits: run.commits, restored }
}

export type Undone = { readonly namings: readonly Naming[]; readonly report: readonly string[] }

export function addedElsewhere(undone: Undone, restored: readonly Restored[]): Undone {
  const paths = new Set(restored.map((one) => one.path))
  const namings = undone.namings.filter((one) => one.path === undefined || !paths.has(one.path))
  const kept = namings.map((one) => `\t${one.pageTypeSlug}/${one.slug}\t`)
  const report = undone.report.filter((line) => kept.some((one) => line.includes(one)))
  return { namings, report }
}

export function askingOf(
  reach: Rewinding,
  root: string,
  restored: readonly Restored[],
  undone: Undone
): readonly Asking[] | Refused {
  const asking: Asking[] = []
  for (const one of undone.namings) {
    const folded = reach.fold(root, one)
    if ("refused" in folded) return folded
    asking.push(...folded)
  }
  for (const one of restored) {
    if (one.body === null || one.whole === true) asking.push(taking(one.path))
    if (one.body !== null) asking.push(putting({ path: one.path, content: one.body }))
  }
  return asking
}

export function restoredReport(restored: readonly Restored[]): readonly string[] {
  return restored.map((one) => `${one.body === null ? "removed" : "restored"}\t${one.path}`)
}
