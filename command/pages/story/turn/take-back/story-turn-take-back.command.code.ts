import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { emptyDraft } from "akasha/command/argument/pages/empty-draft.argument.ts"
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
import { heldOf } from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import {
  REWOUND,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { UNPLAYED } from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
import {
  foldedOf,
  type Unwinding,
  unplayedOf,
} from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import { storyTurnTakeBack as page } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  dropUncommitted,
  mergeUncommitted,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { taking } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  latestOf,
  PLAYER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticedOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const NAMED = [playedTurn, emptyDraft] as const

const TAKEN_BACK = "taken back"

const ACTION = "action"

const ACTION_DRAFT = "actionDraft"

export type TakingBack = Unwinding & {
  readonly draft: (root: string, game: string, action: string | null) => string | null
}

export function draftedBeside(root: string, game: string, action: string | null): string | null {
  const story = listedAt(root, storyPlayed.slug, game)[0]
  if (story === undefined) return `\`${game}\` names no played story here`
  try {
    if (action === null) dropUncommitted(root, story.path, [ACTION_DRAFT])
    else mergeUncommitted(root, story.path, { [ACTION_DRAFT]: action })
    return null
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

const TAKEN: TakingBack = { ...REWOUND, ...UNPLAYED, draft: draftedBeside }

function takeBackNoticeOf(turn: string, latest: string | null): string {
  const after =
    latest === null ? "the story has no turn now" : `the story's latest turn is \`${latest}\``
  return `The turn \`${turn}\` was taken back; ${after}.`
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

export type Drafting = { readonly draft: TakingBack["draft"] }

export function draftedFor(
  reach: Drafting,
  root: string,
  game: string,
  turn: Turn,
  after: Told,
  empty = false
) {
  if (empty) {
    const why = reach.draft(root, game, null)
    if (why === null) after.report.push(`emptied\t${game}\tthe action bar`)
    else after.faults.push(`the action bar was not emptied: ${why}`)
    return
  }
  const action = textAt(turn.value, ACTION)
  if (action === null || action.trim() === "") return
  const why = reach.draft(root, game, action)
  if (why === null) after.report.push(`drafted\t${game}\tthe action, back in the action bar`)
  else after.faults.push(`the action was not put back in the action bar: ${why}`)
}

async function heldOn(
  done: string[],
  asked: { readonly slug: string; readonly empty: boolean },
  given: Given,
  landing: Landing,
  reach: TakingBack
): Promise<Answer> {
  const { slug } = asked
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
  const unmade = await unplayedOf(reach, given.root, turn, held)
  if ("refused" in unmade) return refused(unmade.refused, DATA)
  const folded = foldedOf(reach, given.root, unmade.namings)
  if ("refused" in folded) return refused(folded.refused, DATA)
  const asking = [...folded, ...unmade.asking, taking(turn.at)]
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(given.root, asking, `${slug} is ${TAKEN_BACK}`, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const report = [`${slug}\t${PLAYER}\t${TAKEN_BACK}`, `removed\t${turn.at}`, ...unmade.report]
  const after: Told = { report, faults: [] }
  draftedFor(reach, given.root, held.game, turn, after, asked.empty)
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
  const empty = read.taken.emptyDraft
  const holding = async () => await heldOn(done, { slug, empty }, given, landing, reach)
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
