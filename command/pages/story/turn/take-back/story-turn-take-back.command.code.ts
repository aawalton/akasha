import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { heldOf } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  REWOUND,
  type Rewinding,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  besideTurn,
  seatsStopped,
  undoneOf,
} from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import { storyTurnTakeBack as page } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.ts"
import { textOnDisk } from "akasha/file/system/modules/text-on-disk/text-on-disk.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { told as gitTold } from "akasha/git/modules/running/git-running.module.code.ts"
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
import {
  bareOf,
  latestOf,
  PLAYER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticedOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const NAMED = [playedTurn] as const

const TAKEN_BACK = "taken back"

const WORLD = "world"

const STORIES = "stories/"

const PAGE_ENDING = ".ts"

const UNCOMMITTED = ".uncommitted."

const RECORD = "\x1e"

const FIELD = "\x1f"

const BREAK = "\n"

const MADE = " is made from the player's action"

const TO_PLAYER = ` to ${PLAYER}`

const MOVES = " moves from "

const SHORT = 11

export type Commit = {
  readonly commit: string
  readonly subject: string
  readonly paths: readonly string[]
}

export type Folders = { readonly story: string; readonly world: string }

export type TakingBack = Rewinding & {
  readonly foldersOf: (root: string, game: string) => Folders | null
  readonly commitsOn: (root: string, range: string, within: readonly string[]) => readonly Commit[]
  readonly bodyThen: (root: string, commit: string, path: string) => string | null
  readonly bodyNow: (root: string, path: string) => string | null
  readonly besideOnDisk: (root: string, turn: string) => readonly string[]
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

export function commitsIn(said: string): readonly Commit[] {
  return said
    .split(RECORD)
    .filter((one) => one.trim() !== "")
    .map((one) => {
      const [head = "", ...paths] = one.split(BREAK)
      const cut = head.indexOf(FIELD)
      return {
        commit: head.slice(0, cut),
        subject: head.slice(cut + 1),
        paths: paths.filter((path) => path !== ""),
      }
    })
}

function commitsLogged(root: string, range: string, within: readonly string[]): readonly Commit[] {
  const format = `--format=${RECORD}%H${FIELD}%s`
  const said = gitTold(root, ["log", "--no-renames", "--name-only", format, range, "--", ...within])
  return said === null ? [] : commitsIn(said)
}

function bodyCommitted(root: string, commit: string, path: string): string | null {
  const body = bodyAt(root, commit, path)
  return body === null ? null : Buffer.from(body).toString("utf8")
}

export function besideListed(root: string, turn: string): readonly string[] {
  const folder = dirname(turn)
  const opening = `${turn.slice(folder.length + 1, -PAGE_ENDING.length)}.`
  return readdirSync(join(root, folder), { withFileTypes: true })
    .filter((one) => one.isFile() && one.name.startsWith(opening))
    .filter((one) => !one.name.includes(UNCOMMITTED))
    .map((one) => `${folder}/${one.name}`)
}

export const TAKEN: TakingBack = {
  ...REWOUND,
  foldersOf: foldersIndexed,
  commitsOn: commitsLogged,
  bodyThen: bodyCommitted,
  bodyNow: (root, path) => textOnDisk(join(root, path)),
  besideOnDisk: besideListed,
}

export function takeBackNoticeOf(turn: string, latest: string | null): string {
  const after =
    latest === null ? "the story has no turn now" : `the story's latest turn is \`${latest}\``
  return `The turn \`${turn}\` was taken back; ${after}.`
}

type Refused = { readonly refused: string }

type Making = { readonly made: string; readonly moved: string }

export function makingOf(slug: string, history: readonly Commit[]): Making | Refused {
  const moved = history.find(
    (one) => one.subject.startsWith(`${slug}${MOVES}`) && one.subject.endsWith(TO_PLAYER)
  )
  const made = history.find((one) => one.subject === `${slug}${MADE}`)
  if (made === undefined) return { refused: `no commit made \`${slug}\` from the player's action` }
  if (moved === undefined) return { refused: `no commit moved \`${slug}\` to ${PLAYER}` }
  return { made: made.commit, moved: moved.commit }
}

function derived(path: string): boolean {
  return referencesFiled(path) || shapesFiled(path)
}

export type Restored = { readonly path: string; readonly body: string | null }

export type Undoing = {
  readonly commits: readonly Commit[]
  readonly restored: readonly Restored[]
}

function scopedIn(folders: Folders, path: string): "story" | "world" | "other" | null {
  if (derived(path)) return null
  if (path.startsWith(folders.story)) return "story"
  if (!path.startsWith(folders.world)) return null
  return path.startsWith(`${folders.world}${STORIES}`) ? "other" : "world"
}

type Run = {
  readonly commits: readonly Commit[]
  readonly touched: ReadonlySet<string>
  readonly others: readonly string[]
}

function runIn(run: readonly Commit[], folders: Folders): Run {
  const touched = new Set<string>()
  const others: string[] = []
  const commits: Commit[] = []
  for (const one of run) {
    const scoped = one.paths.filter((path) => {
      const scope = scopedIn(folders, path)
      if (scope === "other") others.push(path)
      return scope === "story" || scope === "world"
    })
    if (scoped.length > 0) commits.push({ ...one, paths: scoped })
    for (const path of scoped) touched.add(path)
  }
  return { commits, touched, others }
}

export function undoingOf(
  reach: TakingBack,
  root: string,
  turn: Turn,
  folders: Folders
): Undoing | Refused {
  const making = makingOf(turn.slug, reach.commitsOn(root, "HEAD", [turn.at]))
  if ("refused" in making) return making
  const before = `${making.made}^`
  const logged = reach.commitsOn(root, `${before}..${making.moved}`, [folders.world, folders.story])
  const run = runIn(logged, folders)
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
        refused: `\`${path}\` changed since \`${turn.slug}\` moved to ${PLAYER}, so going back to its body before the turn would undo that change too`,
      }
    }
    const then = reach.bodyThen(root, before, path)
    if (then !== now) restored.push({ path, body: then })
  }
  return { commits: run.commits, restored }
}

type Undone = { readonly namings: readonly Naming[]; readonly report: readonly string[] }

function addedElsewhere(undone: Undone, restored: readonly Restored[]): Undone {
  const paths = new Set(restored.map((one) => one.path))
  const namings = undone.namings.filter((one) => one.path === undefined || !paths.has(one.path))
  const kept = namings.map((one) => `\t${one.pageTypeSlug}/${one.slug}\t`)
  const report = undone.report.filter((line) => kept.some((one) => line.includes(one)))
  return { namings, report }
}

function askingOf(
  reach: TakingBack,
  root: string,
  undoing: Undoing,
  undone: Undone
): readonly Asking[] | Refused {
  const asking: Asking[] = []
  for (const one of undone.namings) {
    const folded = reach.fold(root, one)
    if ("refused" in folded) return folded
    asking.push(...folded)
  }
  for (const one of undoing.restored) {
    asking.push(
      one.body === null ? taking(one.path) : putting({ path: one.path, content: one.body })
    )
  }
  return asking
}

function reportOf(slug: string, undoing: Undoing, undone: Undone): readonly string[] {
  return [
    `${slug}\t${PLAYER}\t${TAKEN_BACK}`,
    ...undoing.commits.map((one) => `undone\t${one.commit.slice(0, SHORT)}\t${one.subject}`),
    ...undoing.restored.map((one) => `${one.body === null ? "removed" : "restored"}\t${one.path}`),
    ...undone.report,
  ]
}

function latestRefused(reach: TakingBack, root: string, slug: string, game: string): string | null {
  const latest = latestOf(reach.turnsOf(root, game))
  if (latest?.slug === slug) return null
  const instead = latest === null ? "" : `, and \`${latest.slug}\` is`
  return `\`${slug}\` is not the latest turn of \`${game}\`${instead}, so the turns after it would follow a turn never sent`
}

async function noticesOf(
  reach: TakingBack,
  root: string,
  game: string,
  turn: Turn,
  after: Told
): Promise<undefined> {
  const master = reach.storyOf(root, game)?.master ?? null
  if (master === null) {
    after.faults.push(
      `\`${game}\` names no game master seat, so no seat was told the turn was ${TAKEN_BACK}`
    )
    return undefined
  }
  const left = latestOf(reach.turnsOf(root, game).filter((one) => one.slug !== turn.slug))
  const notice = takeBackNoticeOf(turn.at, left?.at ?? null)
  for (const to of noticedOf(master, game)) {
    const why = await reach.notify(to, notice)
    if (why === null) after.report.push(`told\t${to}`)
    else after.faults.push(`\`${to}\` was not told the turn was ${TAKEN_BACK}: ${why}`)
  }
  return undefined
}

async function heldOn(
  done: string[],
  slug: string,
  given: Given,
  landing: Landing,
  reach: TakingBack
): Promise<Answer> {
  const turn = reach.turnAt(given.root, slug)
  if (turn === null) return refused(`\`${slug}\` names no played turn here`, DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  if (held.status !== PLAYER) {
    return refused(
      `\`${slug}\` is at ${held.status}, not yet published to the player, so it is cancelled rather than ${TAKEN_BACK}`,
      DATA
    )
  }
  const notLatest = latestRefused(reach, given.root, slug, held.game)
  if (notLatest !== null) return refused(notLatest, DATA)
  const folders = reach.foldersOf(given.root, held.game)
  if (folders === null) return refused(`\`${held.game}\` names no world here`, DATA)
  const undoing = undoingOf(reach, given.root, turn, folders)
  if ("refused" in undoing) return refused(undoing.refused, DATA)
  const outcomes = await undoneOf(reach, given.root, turn, besideTurn(reach, given.root, turn))
  if ("refused" in outcomes) return refused(outcomes.refused, DATA)
  const undone = addedElsewhere(outcomes, undoing.restored)
  const asking = askingOf(reach, given.root, undoing, undone)
  if ("refused" in asking) return refused(asking.refused, DATA)
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(given.root, asking, `${slug} is ${TAKEN_BACK}`, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const after: Told = { report: [...reportOf(slug, undoing, undone)], faults: [] }
  seatsStopped(reach, given.root, held.game, after)
  if (reach.release(given.root, turn.at)) after.report.push(`discarded\tthe recorders' kept edits`)
  await noticesOf(reach, given.root, held.game, turn, after)
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

async function takenBackOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: TakingBack
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const named = read.taken.playedTurn.trim()
  if (named === "") return refusedBy([`\`${playedTurn.said}\` names no turn`], INPUT)
  const slug = bareOf(named)
  const placed = reach.turnAt(given.root, slug)
  if (placed === null) return refused(`\`${named}\` names no played turn here`, DATA)
  const holding = async () => await heldOn(done, slug, given, landing, reach)
  return await reach.hold(given.root, placed.at, holding)
}

export async function storyTurnTakeBack(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: TakingBack = TAKEN
): Promise<Answer> {
  return await answering(async (done) => await takenBackOn(done, argv, given, landing, reach))
}
