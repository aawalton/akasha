import { readOwnTranscriptsSince } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renamePage } from "akasha/change/mechanical/page/rename/rename-page/rename-page.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"

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
  bodiesOf,
  type Changing,
  cacheNamed,
  changesChecked,
  changesIndexed,
  clearedOf,
  placingIndexed,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import {
  beatsHeld,
  cachedOf,
  type Scening,
  scenedOf,
  scenesIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import { rootReading } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import {
  breakIndexed,
  lengthRefused,
} from "akasha/command/pages/story/turn/advance/modules/chapter-length/chapter-length.module.code.ts"
import {
  type Crossing,
  crossedIndexed,
  crossedSaid,
} from "akasha/command/pages/story/turn/advance/modules/turn-crossed/turn-crossed.module.code.ts"
import { describedIndexed } from "akasha/command/pages/story/turn/advance/modules/turn-described/turn-described.module.code.ts"
import {
  movedTo,
  numberedOf,
  renamedOf,
  type Taken,
  taken,
} from "akasha/command/pages/story/turn/advance/modules/turn-handing/turn-handing.module.code.ts"
import { memorySettled } from "akasha/command/pages/story/turn/advance/modules/turn-memory/turn-memory.module.code.ts"
import {
  timeCheckIndexed,
  untimedRefused,
} from "akasha/command/pages/story/turn/advance/modules/turn-timing/turn-timing.module.code.ts"
import {
  heldOf,
  repairsAfter,
} from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
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
import { advanced } from "akasha/story/world/stories/played/turns/modules/turn-advancing/turn-advancing.module.code.ts"
import {
  type Admitted,
  admittedIndexed,
  type Character,
  castIndexed,
  castKept,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  bareOf,
  type Caller,
  GAME_MASTER,
  type Held,
  MECHANICS,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const PARTED = "/"

const ID = "id"

const TITLE = "title"

const RENAME = `${changeMechanical.slug}${PARTED}${renamePage.slug}` as const

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
  readonly scenesOf: Scening
  readonly changing: Changing
}

function crossedOn(reach: Reaching, root: string, read: Taken, held: Held, turn: Turn): string {
  if (read.chapter || held.status !== WORLD_BUILDER) return ""
  return crossedSaid(reach.crossedOf(root, held.game, turn))
}

function untimedOn(reach: Reaching, root: string, read: Taken, held: Held, turn: Turn) {
  if (read.chapter || held.status !== GAME_MASTER) return null
  return untimedRefused(reach.timeCheckOf(root, held.game), held.game, turn.slug, turn.value)
}

function unsizedOn(read: Taken, held: Held, root: string) {
  if (!read.chapter) return null
  const chapterBreak = read.handed.kind === "beats" ? breakIndexed(root, held.game) : null
  return lengthRefused(read.handed, held.beats ?? 0, chapterBreak)
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
  const { lore, noun, repairs } = at.prompting
  const game = at.game
  await noticesSent(reach, root, game, master, turn, status, after, lore, noun, crossed, repairs)
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
  const textOf = (path: string) => reach.textIn(given.root, path)
  const stated = heldOf(turn, textOf)
  if ("refused" in stated) return refused(stated.refused, DATA)
  const beats = beatsHeld(turn, textOf)
  if ("refused" in beats) return refused(beats.refused, DATA)
  const { changes, memory } = beats
  const story = reach.storyOf(given.root, stated.game)
  const switched = read.chapter && story?.proseOnBeats === true ? { proseOnBeats: true } : {}
  const planned = { beats: beats.beats, scenes: beats.scenes }
  const held = { ...stated, beats: planned.beats.length, changes, memory, planned, ...switched }
  const seat = reach.seatOf(given.root, given.agentId)
  const caller: Caller = seat ?? { role: null, game: null }
  const reviewers = reach.reviewersIn(given.root)
  const recorders = reach.recordersIn(given.root)
  const slugs = reviewers.map((one) => one.slug)
  const recorded = recorders.map((one) => one.slug)
  const mechanics = recorders.filter((one) => one.step === MECHANICS).map((one) => one.slug)
  const cast = reach.castOf(given.root, held.game)
  const admitted = reach.admittedOf(given.root)
  const said = advanced(held, caller, read.handed, slugs, recorded, cast, admitted, mechanics)
  if ("refused" in said) return refused(said.refused, DATA)
  const reading = reach.changing(given.root)
  const unchanged = changesChecked(reading, held, read.handed)
  if (unchanged !== null) return refused(unchanged, DATA)
  const telling = memorySettled(rootReading(given.root), held, read.handed, said.status)
  if ("refused" in telling) return refused(telling.refused, DATA)
  const scened = scenedOf(reach.scenesOf, given.root, held, turn, read.handed)
  if ("refused" in scened) return refused(scened.refused, DATA)
  const timedTurn = { ...turn, value: { ...turn.value, ...scened.values } }
  const untimed = untimedOn(reach, given.root, read, held, timedTurn)
  if (untimed !== null) return refused(untimed, DATA)
  const unsized = unsizedOn(read, held, given.root)
  if (unsized !== null) return refused(unsized, DATA)
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
  const recast = read.handed.kind === "prose" ? {} : castKept(turn, cast, textOf, admitted)
  const inPlay = reach.loreGathered(given.root, turn, { ...recast, ...said.values })
  const titled = read.title === undefined ? {} : { [TITLE]: read.title }
  const naming: Naming = {
    pageTypeSlug: typeOf(read),
    slug,
    path: turn.at,
    merge: true,
    ...clearedOf(
      {
        ...lifted.values,
        ...recast,
        ...said.values,
        ...scened.values,
        ...titled,
        ...inPlay.values,
      },
      said
    ),
    ...bodiesOf(said, beats),
  }
  const folded = reach.fold(given.root, naming)
  if ("refused" in folded) return back([folded.refused])
  const placing = placingIndexed(given.root, held.game, read.chapter)
  const named = cacheNamed(reading, held, said.status, placing)
  if ("refused" in named) return back([named.refused])
  const namings = [...scened.namings, ...named.namings]
  const cached = cachedOf(reach.fold, given.root, { values: {}, namings })
  if ("refused" in cached) return back([cached.refused])
  const renamed = renamedOf(read, slug, held.game)
  const renaming = renamed === null ? [] : [{ at: RENAME, given: { at: turn.at, to: renamed } }]
  const asking = [...folded, ...cached, ...named.appends, ...telling, ...renaming]
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
      repairs: repairsAfter(now.at, held, said),
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
  crossing: Crossing = crossedIndexed,
  scening: Scening = scenesIndexed,
  changing: Changing = changesIndexed
): Promise<Answer> {
  const reaching: Reaching = {
    ...reach,
    timeCheckOf: timing,
    castOf: casting,
    admittedOf: admitting,
    crossedOf: crossing,
    scenesOf: scening,
    changing,
  }
  return await answering(
    async (done) => await advancedOn(done, argv, given, landing, reaching, timed)
  )
}
