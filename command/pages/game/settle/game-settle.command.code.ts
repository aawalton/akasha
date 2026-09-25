import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { bonuses as bonusesArgument } from "akasha/command/argument/pages/bonuses.argument.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { game as gameArgument } from "akasha/command/argument/pages/game.argument.ts"
import { mechanic as mechanicArgument } from "akasha/command/argument/pages/mechanic.argument.ts"
import { reading as readingArgument } from "akasha/command/argument/pages/reading.argument.ts"
import { turn as turnArgument } from "akasha/command/argument/pages/turn.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { gameSettle as page } from "akasha/command/pages/game/settle/game-settle.command.ts"
import { foldedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import type {
  Bonus,
  MechanicRun,
} from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import {
  gameAt,
  gameSlugIn,
  lastRunAt,
  runsIn,
  runsUnder,
  settledBy,
} from "akasha/story/game/game-mechanic/modules/mechanic-settling/mechanic-settling.module.code.ts"
import { pagedRun } from "akasha/story/game/game-mechanic-run/modules/run-paging/run-paging.module.code.ts"
import { z } from "zod"

const NAMED = [
  gameArgument,
  turnArgument,
  mechanicArgument,
  readingArgument,
  diceArgument,
  bonusesArgument,
] as const

const FIRST_TURN = 1
const FIRST_RUN = 1
const FROM = "from"
const BY = "by"
const TAB = "\t"

type Taken = {
  readonly game: string
  readonly turn: number
  readonly mechanic: string
  readonly reading: Record<string, unknown>
  readonly dice: string | null
  readonly bonuses: readonly Bonus[]
}

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

type Read = Taken | { readonly refused: string }

const READING_SAID = z.record(z.string(), z.unknown())

const BONUSES_SAID = z.array(z.object({ [FROM]: z.string(), [BY]: z.number() }))

function jsonIn<Of>(said: string, what: string, shape: z.ZodType<Of>, wrong: string): Held<Of> {
  let held: z.ZodSafeParseResult<Of>
  try {
    held = shape.safeParse(JSON.parse(said))
  } catch {
    return { refused: `\`${what}\` takes JSON, and what was said is none` }
  }
  return held.success ? { answered: held.data } : { refused: wrong }
}

export function readingIn(said: string): Held<Record<string, unknown>> {
  return jsonIn(
    said,
    readingArgument.said,
    READING_SAID,
    `\`${readingArgument.said}\` takes what the mechanic reads, keyed by name`
  )
}

export function bonusesIn(said: string | null): Held<readonly Bonus[]> {
  if (said === null) return { answered: [] }
  return jsonIn(
    said,
    bonusesArgument.said,
    BONUSES_SAID,
    `\`${bonusesArgument.said}\` takes a list, each a \`from\` and a \`by\``
  )
}

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const game = held.game.trim()
  if (game === "") return { refused: `\`${gameArgument.said}\` names no game` }
  const mechanic = held.mechanic.trim()
  if (mechanic === "") return { refused: `\`${mechanicArgument.said}\` names no mechanic` }
  if (!Number.isInteger(held.turn) || held.turn < FIRST_TURN) {
    return { refused: `\`${turnArgument.said}\` takes a whole number of one or more` }
  }
  const reading = readingIn(held.reading)
  if ("refused" in reading) return reading
  const bonuses = bonusesIn(held.bonuses ?? null)
  if ("refused" in bonuses) return bonuses
  const dice = (held.dice ?? "").trim()
  return {
    game,
    turn: held.turn,
    mechanic,
    reading: reading.answered,
    dice: dice === "" ? null : dice,
    bonuses: bonuses.answered,
  }
}

export function messageFor(run: MechanicRun, game: string): string {
  return `settle turn ${run.turn} of ${game} by ${run.mechanic}`
}

export function rowsOf(run: MechanicRun, commit: string | null): readonly string[] {
  const rows = [`turn${TAB}${run.turn}`, `mechanic${TAB}${run.mechanic}`]
  if (run.dice !== null) {
    rows.push(`dice${TAB}${run.dice.said}${TAB}${run.dice.faces.join(" ")}`)
  }
  if (run.seed !== null) rows.push(`seed${TAB}${run.seed}`)
  if (isRecord(run.answered)) {
    for (const [key, value] of Object.entries(run.answered)) {
      rows.push(`${key}${TAB}${JSON.stringify(value)}`)
    }
  } else {
    rows.push(`answered${TAB}${JSON.stringify(run.answered)}`)
  }
  if (commit !== null) rows.push(`commit${TAB}${commit}`)
  return rows
}

async function settled(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const beside = gameAt(given.root, held.game)
  if (beside === null) return refused(`\`${held.game}\` names no game here`, DATA)
  const run = await settledBy({
    root: given.root,
    game: held.game,
    turn: held.turn,
    mechanic: held.mechanic,
    reading: held.reading,
    dice: held.dice,
    bonuses: held.bonuses,
    said: null,
    before: lastRunAt(given.root, held.game),
  })
  if ("refused" in run) return refused(run.refused, DATA)
  const made = pagedRun({
    gameSlug: gameSlugIn(held.game),
    folder: runsUnder(beside),
    run: run.answered,
    at: runsIn(given.root, held.game).length + FIRST_RUN,
  })
  const folded = foldedFor(given.root, [made])
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(
    given.root,
    folded.puts.map(putting),
    messageFor(run.answered, held.game),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(rowsOf(run.answered, landed.commit))
}

export async function gameSettle(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await settled(done, argv, given, landing))
}
