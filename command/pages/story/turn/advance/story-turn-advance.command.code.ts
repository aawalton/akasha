import { readOwnTranscriptsSince } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renamePage } from "akasha/change/mechanical/page/rename/rename-page/rename-page.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
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
import { repointed } from "akasha/command/modules/edits-repointing/edits-repointing.module.code.ts"
import {
  type Crossing,
  crossedIndexed,
  crossedSaid,
} from "akasha/command/pages/story/turn/advance/modules/turn-crossed/turn-crossed.module.code.ts"
import { describedIndexed } from "akasha/command/pages/story/turn/advance/modules/turn-described/turn-described.module.code.ts"
import {
  movedTo,
  numberedOf,
  type Taken,
  taken,
  titledOf,
} from "akasha/command/pages/story/turn/advance/modules/turn-handing/turn-handing.module.code.ts"
import {
  timeCheckIndexed,
  untimedRefused,
} from "akasha/command/pages/story/turn/advance/modules/turn-timing/turn-timing.module.code.ts"
import { liftedFrom } from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"
import {
  noticesSent,
  REACHED,
  type Reach,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  type Context,
  seatsStarted,
} from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Ended,
  madeAtOf,
  phaseEnded,
} from "akasha/story/engine/modules/phase-timing/phase-timing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  type Admitted,
  admittedIndexed,
  type Character,
  castIndexed,
  castKept,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  advanced,
  bareOf,
  type Caller,
  CHAPTER,
  GAME_MASTER,
  type Held,
  stepIn,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const COLLECTIONS = "partOfCollections"

const STATUS = "stepStatus"

const LORE = "lore"

const ISSUES = "issues"

const REVIEWED_BY = "reviewedBy"

const RECORDED_BY = "recordedBy"

const PROSE = "prose"

const STORY = "story"

const OWN_LENGTH = "ownLength"

const PARTED = "/"

const ID = "id"

const TITLE = "title"

const RENAME = `${changeMechanical.slug}${PARTED}${renamePage.slug}` as const

function renamedOf(read: Taken, slug: string, game: string): string | null {
  if (read.title === undefined) return null
  const to = titledOf(slug, game, read.title)
  return to === slug ? null : to
}

export type Timed = (root: string, ended: Ended, agentId: string | null) => undefined

const TIMED_STORIES = [storyPlayed.slug, storyWritten.slug]

function phaseTimed(root: string, ended: Ended, agentId: string | null): undefined {
  try {
    const story = TIMED_STORIES.flatMap((type) => listedAt(root, type, ended.story))[0]
    if (story === undefined) return undefined
    const since = (from: number) =>
      agentId === null ? null : readOwnTranscriptsSince(agentId, from)
    phaseEnded(root, story.path, ended, since)
  } catch {
    return undefined
  }
  return undefined
}

const WRITTEN_OPENING = `${storyWritten.slug}${PARTED}`

const OPENINGS = [`${storyPlayed.slug}${PARTED}`, WRITTEN_OPENING]

export function heldOf(turn: Turn): Held | { readonly refused: string } {
  const of = turn.value[STORY]
  const named = [...stringsIn(turn.value[COLLECTIONS]), ...(typeof of === "string" ? [of] : [])]
  const story = named.find((one) => OPENINGS.some((opening) => one.startsWith(opening)))
  if (story === undefined) return { refused: `\`${turn.at}\` is part of no played story` }
  const status = stepIn(turn.value[STATUS])
  if (status === null) return { refused: `\`${turn.at}\` states no step status` }
  return {
    game: bareOf(story),
    ...(story.startsWith(WRITTEN_OPENING) ? { noun: CHAPTER } : {}),
    status,
    lore: stringsIn(turn.value[LORE]),
    issues: stringsIn(turn.value[ISSUES]),
    reviewedBy: stringsIn(turn.value[REVIEWED_BY]).map(bareOf),
    recordedBy: stringsIn(turn.value[RECORDED_BY]).map(bareOf),
    written: turn.value[PROSE] !== undefined && turn.value[OWN_LENGTH] !== 0,
  }
}

function stepAt(reach: Reach, root: string, read: Taken, slug: string): Turn | null {
  return read.chapter ? (reach.chapterAt?.(root, slug) ?? null) : reach.turnAt(root, slug)
}

function unplaced(read: Taken): string {
  return `\`${read.turn}\` names no ${read.chapter ? "written chapter" : "played turn"} here`
}

function typeOf(read: Taken): string {
  return read.chapter ? storyChapterWritten.slug : storyTurnPlayed.slug
}

export type Timing = (root: string, game: string) => string | null

export type Casting = (root: string, game: string) => readonly Character[]

export type Admitting = (root: string) => Admitted

type Reaching = Reach & {
  readonly timeCheckOf: Timing
  readonly castOf: Casting
  readonly admittedOf: Admitting
  readonly crossedOf: Crossing
}

function crossedOn(reach: Reaching, root: string, read: Taken, held: Held, turn: Turn): string {
  if (read.chapter || held.status !== WORLD_BUILDER) return ""
  return crossedSaid(reach.crossedOf(root, held.game, turn))
}

function untimedOn(reach: Reaching, root: string, read: Taken, held: Held, turn: Turn) {
  if (read.chapter || held.status !== GAME_MASTER) return null
  return untimedRefused(reach.timeCheckOf(root, held.game), held.game, turn.slug, turn.value)
}

async function noticesOver(
  reach: Reach,
  root: string,
  at: Context,
  status: TurnStep,
  after: Told,
  crossed: string
) {
  const master = at.story?.master ?? null
  const turn = at.prompting.turnAt
  const { lore, noun } = at.prompting
  await noticesSent(reach, root, at.game, master, turn, status, after, lore, noun, crossed)
}

async function advancedOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reaching,
  timed: Timed
): Promise<Answer> {
  const read = taken(argv, given.calledAs, given.root)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const slug = bareOf(read.turn)
  const placed = stepAt(reach, given.root, read, slug)
  if (placed === null) return refused(unplaced(read), DATA)
  const holding = async () => await heldOn(done, read, slug, given, landing, reach, timed)
  return await reach.hold(given.root, placed.at, holding)
}

async function heldOn(
  done: string[],
  read: Taken,
  slug: string,
  given: Given,
  landing: Landing,
  reach: Reaching,
  timed: Timed
): Promise<Answer> {
  const turn = stepAt(reach, given.root, read, slug)
  if (turn === null) return refused(unplaced(read), DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  const seat = reach.seatOf(given.root, given.agentId)
  const caller: Caller = seat ?? { role: null, game: null }
  const reviewers = reach.reviewersIn(given.root)
  const recorders = reach.recordersIn(given.root)
  const slugs = reviewers.map((one) => one.slug)
  const recorded = recorders.map((one) => one.slug)
  const cast = reach.castOf(given.root, held.game)
  const admitted = reach.admittedOf(given.root)
  const said = advanced(held, caller, read.handed, slugs, recorded, cast, admitted)
  if ("refused" in said) return refused(said.refused, DATA)
  const untimed = untimedOn(reach, given.root, read, held, turn)
  if (untimed !== null) return refused(untimed, DATA)
  const recording = read.handed.kind === "record"
  const moved = recording ? reach.keep(given.root, given.agentId, turn.at) : []
  if ("refused" in moved) return refused(moved.refused, DATA)
  const back = (why: readonly string[]): Answer => {
    const lost = reach.giveBack(given.root, given.agentId, turn.at, moved)
    const kept = lost === null ? [] : [`the drafted edits stay beside the turn: ${lost}`]
    return refusedBy([...why, ...kept], DATA)
  }
  const kept = recording ? reach.kept(given.root, turn.at) : []
  if ("refused" in kept) return back([kept.refused])
  const lifted = liftedFrom(turn, kept, () => reach.textIn(given.root, turn.at))
  if ("refused" in lifted) return back([lifted.refused])
  const own = kept.filter((one) => !lifted.rest.includes(one))
  const textOf = (path: string) => reach.textIn(given.root, path)
  const recast = read.handed.kind === "prose" ? {} : castKept(turn, cast, textOf, admitted)
  const inPlay = reach.loreGathered(given.root, turn, { ...recast, ...said.values })
  const titled = read.title === undefined ? {} : { [TITLE]: read.title }
  const naming: Naming = {
    pageTypeSlug: typeOf(read),
    slug,
    path: turn.at,
    merge: true,
    values: { ...lifted.values, ...recast, ...said.values, ...titled, ...inPlay.values },
    ...(said.prose === null ? {} : { bodies: { prose: said.prose } }),
  }
  const folded = reach.fold(given.root, naming)
  if ("refused" in folded) return back([folded.refused])
  const renamed = renamedOf(read, slug, held.game)
  const renaming = renamed === null ? [] : [{ at: RENAME, given: { at: turn.at, to: renamed } }]
  const asking = [...folded, ...renaming]
  const now =
    renamed === null
      ? { slug, at: turn.at }
      : { slug: renamed, at: movedTo(turn.at, slug, renamed) }
  const message = `${slug} moves from ${held.status} to ${said.status}`
  const landsWith = said.landsKept ? lifted.rest : []
  const by = { agentId: given.agentId, writer: given.writer, done, kept: landsWith }
  const landed = await landing(given.root, asking, message, by)
  if ("refusals" in landed) return keeping(done, back([...landed.refusals]))
  if (said.landsKept) reach.release(given.root, now.at)
  const ended = {
    story: held.game,
    run: read.chapter ? numberedOf(slug, held.game) : slug,
    madeAt: madeAtOf(turn.value[ID]),
    phase: held.status,
    seat: seat?.name ?? held.status,
    endedAt: Date.now(),
  }
  timed(given.root, ended, given.agentId)
  const ownNow = own.map((one) => repointed(one, [{ from: turn.at, to: now.at }]))
  const unkept = said.landsKept ? null : reach.unkeep(given.root, now.at, ownNow)
  const story = reach.storyOf(given.root, held.game)
  const at: Context = {
    game: held.game,
    story,
    reviewers,
    recorders,
    prompting: {
      title: story?.title ?? held.game,
      turnAt: now.at,
      address: `${typeOf(read)}${PARTED}${now.slug}`,
      ...(held.noun === undefined ? {} : { noun: held.noun }),
      calledAs: given.calledAs,
      lore: inPlay.named,
      written: reach.writtenOn(given.root, turn),
      ...(read.chapter ? {} : { described: describedIndexed(given.root, turn) }),
    },
  }
  const moving = `${slug}\t${held.status}\t${said.status}`
  const report = said.landsKept ? [moving, `landed\t${kept.length} kept edit(s)`] : [moving]
  if (renamed !== null) report.push(`renamed\t${now.at}`)
  const after: Told = { report, faults: [] }
  if (unkept !== null) after.faults.push(`the folded edits stay beside the turn: ${unkept}`)
  if (said.status !== held.status) {
    const crossed = crossedOn(reach, given.root, read, held, turn)
    await noticesOver(reach, given.root, at, said.status, after, crossed)
  }
  await seatsStarted(reach, at, said.starts, done, after)
  if (said.stopsCaller && seat !== null) {
    reach.stop(given.root, seat.name)
    after.report.push(`stopping\t${seat.name}`)
  }
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

export async function storyTurnAdvance(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = REACHED,
  timed: Timed = phaseTimed,
  timing: Timing = timeCheckIndexed,
  casting: Casting = castIndexed,
  admitting: Admitting = admittedIndexed,
  crossing: Crossing = crossedIndexed
): Promise<Answer> {
  const reaching: Reaching = {
    ...reach,
    timeCheckOf: timing,
    castOf: casting,
    admittedOf: admitting,
    crossedOf: crossing,
  }
  return await answering(
    async (done) => await advancedOn(done, argv, given, landing, reaching, timed)
  )
}
