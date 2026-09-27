import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { actionFile } from "akasha/command/argument/pages/action-file.argument.ts"
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
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { rollsAt } from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import { heldOf } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  noticesSent,
  REWOUND,
  type Rewinding,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnRewind as page } from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { taking } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import {
  bareOf,
  LONGEST_ACTION,
  latestOf,
  statusOf,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [playedTurn, actionFile] as const

const KEPT = ["partOfCollections", "position", "unit"] as const

const STATUS = "turnStatus"

const ACTION = "action"

const PROSE = "prose"

const PROSE_HELD = "txt"

const TRAILING_LINES = /(?:\r?\n)+$/

const STOPPED: readonly string[] = [reviewerRole.slug, storyRecorderRole.slug]

type Taken = { readonly turn: string; readonly action: string | null }

type Refusal = { readonly refused: readonly string[] }

export function taken(argv: readonly string[], calledAs: string, root: string): Taken | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const held = read.taken
  const turn = held.playedTurn.trim()
  if (turn === "") return { refused: [`\`${playedTurn.said}\` names no turn`] }
  if (held.actionFile === undefined) return { turn, action: null }
  const file = heldAt(root, actionFile.said, held.actionFile)
  if ("refused" in file) return file
  const action = file.text.replace(TRAILING_LINES, "")
  if (action.trim() === "") {
    return { refused: [`\`${actionFile.said} ${held.actionFile}\` holds no action`] }
  }
  if (action.length > LONGEST_ACTION) {
    return {
      refused: [
        `an action is at most ${LONGEST_ACTION} characters, and \`${held.actionFile}\` holds ${action.length}`,
      ],
    }
  }
  return { turn, action }
}

export function rewound(turn: Turn, action: string): Readonly<Record<string, unknown>> {
  const values: Record<string, unknown> = {}
  for (const key of KEPT) {
    if (turn.value[key] !== undefined) values[key] = turn.value[key]
  }
  values[STATUS] = statusOf(WORLD_BUILDER)
  values[ACTION] = action
  return values
}

const OWN_KEYS: readonly string[] = ["id", "type", "slug"]

function alreadyRewound(
  turn: Turn,
  values: Readonly<Record<string, unknown>>,
  gone: readonly string[]
): boolean {
  if (gone.length > 0) return false
  const held = Object.keys(turn.value).filter((key) => !OWN_KEYS.includes(key))
  if (held.length !== Object.keys(values).length) return false
  return held.every((key) => JSON.stringify(turn.value[key]) === JSON.stringify(values[key]))
}

function besideTurn(reach: Rewinding, root: string, turn: Turn): readonly string[] {
  const prose = besideAt(turn.at, PROSE, textAt(turn.value, PROSE) ?? PROSE_HELD)
  return [prose, rollsAt(turn.at)].filter(
    (one): one is string => one !== null && reach.present(root, one)
  )
}

function latestRefused(reach: Rewinding, root: string, slug: string, game: string): string | null {
  const latest = latestOf(reach.turnsOf(root, game))
  if (latest?.slug === slug) return null
  const instead = latest === null ? "" : `, and \`${latest.slug}\` is`
  return `\`${slug}\` is not the latest turn of \`${game}\`${instead}, so the turns after it would follow a turn made again`
}

function seatsStopped(reach: Rewinding, root: string, game: string, after: Told) {
  for (const seat of reach.seatsIn()) {
    if (seat.game !== game || seat.role === null || !STOPPED.includes(seat.role)) continue
    reach.stop(root, seat.name)
    after.report.push(`stopping\t${seat.name}`)
  }
}

async function rewoundOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Rewinding
): Promise<Answer> {
  const read = taken(argv, given.calledAs, given.root)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const slug = bareOf(read.turn)
  const turn = reach.turnAt(given.root, slug)
  if (turn === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  const notLatest = latestRefused(reach, given.root, slug, held.game)
  if (notLatest !== null) return refused(notLatest, DATA)
  const action = read.action ?? textAt(turn.value, ACTION)
  if (action === null || action.trim() === "") {
    return refused(
      `\`${slug}\` states no action, so a rewind names the action at \`${actionFile.said}\``,
      DATA
    )
  }
  const values = rewound(turn, action)
  const gone = besideTurn(reach, given.root, turn)
  if (!alreadyRewound(turn, values, gone)) {
    const naming: Naming = { pageTypeSlug: storyTurnPlayed.slug, slug, path: turn.at, values }
    const asking = reach.fold(given.root, naming)
    if ("refused" in asking) return refused(asking.refused, DATA)
    const message = `${slug} is rewound from ${held.status} to ${WORLD_BUILDER}`
    const by = { agentId: given.agentId, writer: given.writer, done }
    const landed = await landing(given.root, [...asking, ...gone.map(taking)], message, by)
    if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  }
  const after: Told = {
    report: [`${slug}\t${held.status}\t${WORLD_BUILDER}`, ...gone.map((one) => `removed\t${one}`)],
    faults: [],
  }
  seatsStopped(reach, given.root, held.game, after)
  if (reach.release(given.root, turn.at)) after.report.push(`discarded\tthe recorders' kept edits`)
  const master = reach.storyOf(given.root, held.game)?.master ?? null
  await noticesSent(reach, held.game, master, turn.at, WORLD_BUILDER, after)
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

export async function storyTurnRewind(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Rewinding = REWOUND
): Promise<Answer> {
  return await answering(async (done) => await rewoundOn(done, argv, given, landing, reach))
}
