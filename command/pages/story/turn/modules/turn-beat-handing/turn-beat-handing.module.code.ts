import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  inOrder,
  type Paged,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  type BeatAsking,
  beatPrompt,
  type Flowing,
} from "akasha/command/pages/story/turn/modules/turn-beat-prompting/turn-beat-prompting.module.code.ts"
import { checklistServed } from "akasha/command/pages/story/turn/modules/turn-checklist-serving/turn-checklist-serving.module.code.ts"
import {
  handedOut,
  masterOf,
  notedOf,
  startedAgain,
} from "akasha/command/pages/story/turn/modules/turn-hand-retrying/turn-hand-retrying.module.code.ts"
import type { Starting } from "akasha/command/pages/story/turn/modules/turn-job-handing/turn-job-handing.module.code.ts"
import {
  noticesSent,
  REACHED,
  type Reach,
  type Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Context } from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import {
  doneBy,
  type FlowPart,
  type Ready,
  readyAcross,
  refusedAt,
} from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import {
  type Beats,
  NO_BEATS,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  type BeatJob,
  recorderOf,
} from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import {
  BEATS,
  CHAPTER,
  type Held,
  type Moved,
  statusOf,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  coordinatorOf,
  flexOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const STATUS = "stepStatus"

export function flowingIn(story: readonly Paged[], turn: string): readonly Flowing[] {
  const flowing = statusOf(BEATS)
  return inOrder(story).flatMap((one): Flowing[] => {
    if (one.closed === true || one.at === undefined) return []
    if (one.slug !== turn && one.value[STATUS] !== flowing) return []
    const read = one.beats ?? NO_BEATS
    return [{ slug: one.slug, at: one.at, beats: "refused" in read ? NO_BEATS : read }]
  })
}

type StepSeat = { readonly name: string; readonly role: string; readonly game: string }

const LISTED: readonly FlowPart[] = ["changes", "memory", "pictured"]

export function seatPartOf(
  seat: StepSeat,
  persona: string,
  recorders: readonly string[]
): FlowPart | null {
  if (seat.role === writerRole.slug) return "prose"
  if (seat.role === gameMasterRole.slug) return "event"
  if (seat.role !== storyRecorderRole.slug) return null
  const named = (recorder: string) =>
    `${persona}-${storyRecorderRole.slug}-${seat.game}-${flexOf(recorders, recorder)}`
  return LISTED.find((part) => seat.name === named(recorderOf(part) ?? "")) ?? null
}

function readyOn(turns: readonly Beats[], part: FlowPart): Ready | null {
  if (part !== "event") return readyAcross(turns, part)
  const turn = turns.findIndex((one) => refusedAt(one) !== null)
  const held = turns[turn]
  const beat = held === undefined ? null : refusedAt(held)
  return beat === null ? null : { turn, beat }
}

export function readyBeatOf(root: string, seat: StepSeat, calledAs: string): string | null {
  const story = REACHED.storyOf(root, seat.game)
  const master = story?.master ?? null
  const persona = master === null ? null : (coordinatorOf(master, seat.game)?.persona ?? null)
  if (persona === null) return null
  const recorders = REACHED.recordersIn(root)
  const part = seatPartOf(
    seat,
    persona,
    recorders.map((one) => one.slug)
  )
  if (part === null) return null
  const flowing = flowingIn(storyIndexed(root, seat.game, false), "")
  const ready = readyOn(
    flowing.map((one) => one.beats),
    part
  )
  const turn = ready === null ? undefined : flowing[ready.turn]
  if (ready === null || turn === undefined) return null
  const title = story?.title ?? seat.game
  return beatPrompt(part, { title, calledAs, turn, beat: ready.beat, recorders, master })
}

export function notesSaid(turnAt: string, notes: readonly string[]): string {
  const listed = notes.map((one) => `- ${one}`)
  return [
    `A reviewer's notes on \`${turnAt}\`, whose beats are shown and are never written again. Mend nothing in that turn: heed the notes in the turns to come.`,
    "",
    ...listed,
  ].join("\n")
}

async function notesTold(
  reach: Reach,
  at: Context,
  seats: readonly string[],
  said: Moved,
  after: Told
): Promise<undefined> {
  const notes = said.notes ?? []
  if (notes.length === 0) return undefined
  const body = notesSaid(at.prompting.turnAt, notes)
  for (const to of seats) {
    const why = await reach.notify(to, body)
    if (why === null) after.report.push(`told\t${to}\tnotes`)
    else after.faults.push(`\`${to}\` was not told a reviewer's notes: ${why}`)
  }
  return undefined
}

export function rememberedNow(before: Beats, after: Beats): boolean {
  return !doneBy(before, "memory") && doneBy(after, "memory")
}

export function waitingAfter(story: readonly Paged[], slug: string): string | null {
  const ordered = inOrder(story).filter((one) => one.closed !== true)
  const next = ordered[ordered.findIndex((one) => one.slug === slug) + 1]
  if (next?.at === undefined || next.value[STATUS] !== statusOf(WORLD_BUILDER)) return null
  return next.at
}

function startingOf(job: BeatJob, asked: BeatAsking, persona: string, game: string): Starting {
  const prompt = beatPrompt(job.part, asked)
  const recorder = recorderOf(job.part)
  if (job.part === "event") return { persona, role: gameMasterRole.slug, game, flex: null, prompt }
  if (recorder === null) return { persona, role: writerRole.slug, game, flex: null, prompt }
  const flex = flexOf(
    asked.recorders.map((one) => one.slug),
    recorder
  )
  return { persona, role: storyRecorderRole.slug, game, flex, prompt }
}

type Serving = (root: string, game: string, calledAs: string) => string

export async function beatsHanded(
  reach: Reach,
  root: string,
  at: Context,
  held: Held,
  said: Moved,
  slug: string,
  done: string[],
  after: Told,
  serve: Serving = checklistServed
): Promise<undefined> {
  await beatsHandedOut(reach, root, at, held, said, slug, done, after)
  if (held.oneSeat === true) after.report.push(serve(root, at.game, at.prompting.calledAs))
  return undefined
}

async function beatsHandedOut(
  reach: Reach,
  root: string,
  at: Context,
  held: Held,
  said: Moved,
  slug: string,
  done: string[],
  after: Told
): Promise<undefined> {
  if (held.roleplayed === true || held.noun === CHAPTER) return undefined
  if (held.status !== BEATS && said.status !== BEATS) return undefined
  const seated = await masterOf(reach, root, at.game)
  if ("refused" in seated) {
    after.faults.push(seated.refused)
    return undefined
  }
  const { master, persona } = seated
  const story = storyIndexed(root, held.game, false)
  const flowing = flowingIn(story, slug)
  const now = flowing.map((one) => one.beats)
  const was = held.status === BEATS ? (held.flow ?? NO_BEATS) : NO_BEATS
  const before = flowing.map((one, index) => (one.slug === slug ? was : (now[index] ?? NO_BEATS)))
  await notesTold(reach, at, notedOf(at, seated), said, after)
  const turnNow = flowing.find((one) => one.slug === slug)?.beats ?? NO_BEATS
  const waiting = rememberedNow(was, turnNow) ? waitingAfter(story, slug) : null
  if (waiting !== null) {
    await noticesSent(reach, root, held.game, master, waiting, WORLD_BUILDER, after)
  }
  for (const job of handedOut(at, before, now)) {
    const turn = flowing[job.turn]
    if (turn === undefined) continue
    const asked = {
      title: at.prompting.title,
      calledAs: at.prompting.calledAs,
      turn,
      beat: job.beat,
      recorders: at.recorders,
      master,
    }
    const starting = startingOf(job, asked, persona, at.game)
    try {
      const handed = await startedAgain(reach, starting, done)
      after.report.push(`${handed.how}\t${handed.name}\tbeat ${job.beat} of ${turn.slug}`)
    } catch (thrown) {
      after.faults.push(`beat ${job.beat} of \`${turn.slug}\` was not handed out: ${whyOf(thrown)}`)
    }
  }
  return undefined
}
