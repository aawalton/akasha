import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
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
import {
  type Added,
  outcomesAt,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
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

const BREAK = "\n"

const CHECK = "check"

const READING = "reading"

const ANSWERED = "answered"

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

export function besideTurn(reach: Rewinding, root: string, turn: Turn): readonly string[] {
  const prose = besideAt(turn.at, PROSE, textAt(turn.value, PROSE) ?? PROSE_HELD)
  return [prose, outcomesAt(turn.at)].filter(
    (one): one is string => one !== null && reach.present(root, one)
  )
}

type Undone = { readonly namings: readonly Naming[]; readonly report: readonly string[] }

async function addedIn(
  reach: Rewinding,
  root: string,
  at: string
): Promise<readonly Added[] | { readonly refused: string }> {
  const added: Added[] = []
  for (const line of reach.textIn(root, at).split(BREAK)) {
    if (line.trim() === "") continue
    const roll: unknown = JSON.parse(line)
    const check = isRecord(roll) ? roll[CHECK] : null
    if (!isRecord(roll) || typeof check !== "string") {
      return { refused: `\`${at}\` holds a line naming no check` }
    }
    const adding = await reach.addingOf(root, bareOf(check))
    if (adding === null) {
      return {
        refused: `\`${check}\`, settled in \`${at}\`, names no check here, so what it added cannot be taken back`,
      }
    }
    added.push(...adding(roll[READING], roll[ANSWERED]))
  }
  return added
}

export async function undoneOf(
  reach: Rewinding,
  root: string,
  turn: Turn,
  gone: readonly string[]
): Promise<Undone | { readonly refused: string }> {
  const at = outcomesAt(turn.at)
  if (at === null || !gone.includes(at)) return { namings: [], report: [] }
  const added = await addedIn(reach, root, at)
  if ("refused" in added) return added
  const byPage = new Map<string, Map<string, number>>()
  for (const one of added) {
    const keys = byPage.get(one.page) ?? new Map<string, number>()
    keys.set(one.key, (keys.get(one.key) ?? 0) + one.by)
    byPage.set(one.page, keys)
  }
  const namings: Naming[] = []
  const report: string[] = []
  for (const [onto, keys] of byPage) {
    const held = reach.pageAt(root, onto)
    if (held === null) return { refused: `\`${onto}\`, which \`${at}\` added to, is no page here` }
    const values: Record<string, unknown> = {}
    for (const [key, by] of keys) {
      const was = held.value[key]
      if (typeof was !== "number") {
        return { refused: `\`${onto}\` states no number at \`${key}\` for \`${at}\` to take back` }
      }
      values[key] = was - by
      report.push(`taken back\t${onto}\t${key}`)
    }
    namings.push({
      pageTypeSlug: held.pageTypeSlug,
      slug: held.slug,
      path: held.at,
      values,
      merge: true,
    })
  }
  return { namings, report }
}

function latestRefused(reach: Rewinding, root: string, slug: string, game: string): string | null {
  const latest = latestOf(reach.turnsOf(root, game))
  if (latest?.slug === slug) return null
  const instead = latest === null ? "" : `, and \`${latest.slug}\` is`
  return `\`${slug}\` is not the latest turn of \`${game}\`${instead}, so the turns after it would follow a turn made again`
}

export function seatsStopped(reach: Rewinding, root: string, game: string, after: Told) {
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
  const undone = await undoneOf(reach, given.root, turn, gone)
  if ("refused" in undone) return refused(undone.refused, DATA)
  if (!alreadyRewound(turn, values, gone)) {
    const naming: Naming = { pageTypeSlug: storyTurnPlayed.slug, slug, path: turn.at, values }
    const asking: Asking[] = []
    for (const one of [naming, ...undone.namings]) {
      const folded = reach.fold(given.root, one)
      if ("refused" in folded) return refused(folded.refused, DATA)
      asking.push(...folded)
    }
    const message = `${slug} is rewound from ${held.status} to ${WORLD_BUILDER}`
    const by = { agentId: given.agentId, writer: given.writer, done }
    const landed = await landing(given.root, [...asking, ...gone.map(taking)], message, by)
    if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  }
  const after: Told = {
    report: [
      `${slug}\t${held.status}\t${WORLD_BUILDER}`,
      ...gone.map((one) => `removed\t${one}`),
      ...undone.report,
    ],
    faults: [],
  }
  seatsStopped(reach, given.root, held.game, after)
  if (reach.release(given.root, turn.at)) after.report.push(`discarded\tthe recorders' kept edits`)
  const master = reach.storyOf(given.root, held.game)?.master ?? null
  await noticesSent(reach, given.root, held.game, master, turn.at, WORLD_BUILDER, after)
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
