import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { crossing as crossingArgument } from "akasha/command/argument/pages/crossing.argument.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { everyMinutes } from "akasha/command/argument/pages/every-minutes.argument.ts"
import { playedTurn as turnArgument } from "akasha/command/argument/pages/played-turn.argument.ts"
import { reading as readingArgument } from "akasha/command/argument/pages/reading.argument.ts"
import { sessions as sessionsArgument } from "akasha/command/argument/pages/sessions.argument.ts"
import { settledCheck as checkArgument } from "akasha/command/argument/pages/settled-check.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import { untilInstant } from "akasha/command/argument/pages/until-instant.argument.ts"
import { upkeepReading } from "akasha/command/argument/pages/upkeep-reading.argument.ts"
import { storyMontage as page } from "akasha/command/pages/story/montage/story-montage.command.ts"
import { z } from "zod"

const NAMED = [
  storyArgument,
  checkArgument,
  readingArgument,
  everyMinutes,
  diceArgument,
  upkeepReading,
  sessionsArgument,
  untilInstant,
  crossingArgument,
  turnArgument,
] as const

const PARTED = "/"

const READING_SAID = z.record(z.string(), z.unknown())

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

export type Taken = {
  readonly story: string
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly every: number
  readonly dice: string | null
  readonly upkeep: Record<string, unknown> | null
  readonly sessions: number | null
  readonly until: string | null
  readonly crossing: string | null
  readonly turn: string | null
}

type Bounding = {
  readonly every: number
  readonly sessions?: number | undefined
  readonly untilInstant?: string | undefined
  readonly crossing?: string | undefined
}

function jsonIn(said: string, flag: string): Held<Record<string, unknown>> {
  try {
    const held = READING_SAID.safeParse(JSON.parse(said))
    if (held.success) return { answered: held.data }
  } catch {
    return { refused: `\`${flag}\` takes JSON, and what was said is none` }
  }
  return { refused: `\`${flag}\` takes what the check reads, keyed by name` }
}

function boundsRefused(held: Bounding): string | null {
  if (held.every < 1) return `\`${everyMinutes.said}\` passes at least one minute a session`
  if (held.sessions !== undefined && held.sessions < 1) {
    return `\`${sessionsArgument.said}\` runs at least one session`
  }
  if (held.untilInstant !== undefined && Number.isNaN(Date.parse(held.untilInstant))) {
    return `\`${untilInstant.said}\` takes an instant, as \`2026-10-27T08:00:00.000Z\``
  }
  const bounded = [held.sessions, held.untilInstant, held.crossing].some((one) => one !== undefined)
  if (bounded) return null
  return `a montage is bounded by \`${sessionsArgument.said}\`, \`${untilInstant.said}\` or \`${crossingArgument.said}\``
}

function filled(said: string | undefined): string | null {
  const trimmed = said?.trim() ?? ""
  return trimmed === "" ? null : trimmed
}

export function taken(
  argv: readonly string[],
  calledAs: string
): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const story = held.story.trim()
  if (story === "") return { refused: `\`${storyArgument.said}\` names no story` }
  const check = held.settledCheck.trim()
  if (check === "") return { refused: `\`${checkArgument.said}\` names no check` }
  const every = held.everyMinutes
  const bounds = boundsRefused({ ...held, every })
  if (bounds !== null) return { refused: bounds }
  const reading = jsonIn(held.reading, readingArgument.said)
  if ("refused" in reading) return reading
  const upkept = held.upkeepReading
  const upkeep = upkept === undefined ? null : jsonIn(upkept, upkeepReading.said)
  if (upkeep !== null && "refused" in upkeep) return upkeep
  const turn = filled(held.playedTurn)
  return {
    story,
    check,
    reading: reading.answered,
    every,
    dice: filled(held.dice),
    upkeep: upkeep === null ? null : upkeep.answered,
    sessions: held.sessions ?? null,
    until: held.untilInstant ?? null,
    crossing: filled(held.crossing),
    turn: turn === null ? null : turn.slice(turn.lastIndexOf(PARTED) + 1),
  }
}
