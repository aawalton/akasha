import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
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
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import { heldOf } from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import {
  REACHED,
  type Reach,
  type Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  type Context,
  seatsStarted,
} from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import { storyTurnRecord as page } from "akasha/command/pages/story/turn/record/story-turn-record.command.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  bareOf,
  MECHANICS,
  PLAYER,
  RECORDERS,
  type Start,
  slugAfter,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [playedTurn, recorderArgument] as const

const PARTED = "/"

const SPACE = " "

function advancingAs(calledAs: string): string {
  return `${calledAs.slice(0, calledAs.lastIndexOf(SPACE) + SPACE.length)}${storyTurnAdvance.name}`
}

function recorderStep(calledAs: string, slug: string): string {
  return `a story recorder hands in its step with \`${advancingAs(calledAs)} ${playedTurn.said} ${storyTurnPlayed.slug}${PARTED}${slug} ${recorderArgument.said} <recorder>\``
}

function published(reach: Reach, root: string): readonly string[] {
  return reach.reviewersIn(root).map((one) => `${storyReviewer.slug}${PARTED}${one.slug}`)
}

async function heldOn(
  done: string[],
  slug: string,
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const turn = reach.turnAt(given.root, slug)
  if (turn === null) return refused(`\`${slug}\` names no played turn here`, DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  if (held.status === RECORDERS) {
    return refused(
      `\`${slug}\` is at ${RECORDERS} already, so ${recorderStep(given.calledAs, slug)}`,
      DATA
    )
  }
  if (held.status !== PLAYER) {
    return refused(
      `\`${slug}\` is at ${held.status}, so its recorders run as it moves on from there`,
      DATA
    )
  }
  const next = slugAfter(slug)
  if (next !== null && reach.turnAt(given.root, next) !== null) {
    return refused(
      `\`${slug}\` is followed by \`${next}\` already, and a turn is recorded only while no turn follows it, since the two turns' recorders would sit in the same seats`,
      DATA
    )
  }
  if (held.recordedBy.length > 0) {
    return refused(
      `\`${slug}\` was recorded already by ${held.recordedBy.join(", ")}, and a turn is recorded once`,
      DATA
    )
  }
  const recorders = reach.recordersIn(given.root)
  if (recorders.length === 0) return refused("there is no story recorder here to run", DATA)
  const asking = reach.fold(given.root, {
    pageTypeSlug: storyTurnPlayed.slug,
    slug,
    path: turn.at,
    merge: true,
    values: { stepStatus: statusOf(RECORDERS), reviewedBy: published(reach, given.root) },
  })
  if ("refused" in asking) return refused(asking.refused, DATA)
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(
    given.root,
    asking,
    `${slug} moves from ${PLAYER} to ${RECORDERS}`,
    by
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const story = reach.storyOf(given.root, held.game)
  const at: Context = {
    game: held.game,
    story,
    reviewers: [],
    recorders,
    prompting: {
      title: story?.title ?? held.game,
      turnAt: turn.at,
      address: `${storyTurnPlayed.slug}${PARTED}${slug}`,
      calledAs: advancingAs(given.calledAs),
      lore: reach.loreGathered(given.root, turn, turn.value).named,
      written: reach.writtenOn(given.root, turn),
    },
  }
  const running = recorders.filter((one) => one.step !== MECHANICS)
  const starts = running.map((one): Start => ({ kind: "recorder", recorder: one.slug }))
  const after: Told = { report: [`${slug}\t${PLAYER}\t${RECORDERS}`], faults: [] }
  await seatsStarted(reach, at, starts, done, after)
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

async function recordedOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  if (read.taken.recorder !== undefined) {
    return refusedBy(
      [
        `this starts the recorders on a turn at ${PLAYER}, so it names no recorder; ${recorderStep(given.calledAs, "<turn>")}`,
      ],
      INPUT
    )
  }
  const named = read.taken.playedTurn.trim()
  if (named === "") return refusedBy([`\`${playedTurn.said}\` names no turn`], INPUT)
  const slug = bareOf(named)
  const placed = reach.turnAt(given.root, slug)
  if (placed === null) return refused(`\`${named}\` names no played turn here`, DATA)
  return await reach.hold(
    given.root,
    placed.at,
    async () => await heldOn(done, slug, given, landing, reach)
  )
}

export async function storyTurnRecord(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = REACHED
): Promise<Answer> {
  return await answering(async (done) => await recordedOn(done, argv, given, landing, reach))
}
