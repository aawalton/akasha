import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { draft as draftArgument } from "akasha/command/argument/pages/draft.argument.ts"
import { playedTurn as turnArgument } from "akasha/command/argument/pages/played-turn.argument.ts"
import { reading as readingArgument } from "akasha/command/argument/pages/reading.argument.ts"
import { settledCheck as checkArgument } from "akasha/command/argument/pages/settled-check.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import { storySettle as page } from "akasha/command/pages/story/settle/story-settle.command.ts"
import { z } from "zod"

const NAMED = [
  storyArgument,
  checkArgument,
  readingArgument,
  diceArgument,
  turnArgument,
  draftArgument,
] as const

const PARTED = "/"

const READING_SAID = z.record(z.string(), z.unknown())

export type Taken = {
  readonly story: string
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly dice: string | null
  readonly turn: string | null
  readonly drafts: boolean
}

type Read = Taken | { readonly refused: string }

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

function readingIn(said: string): Held<Record<string, unknown>> {
  let held: z.ZodSafeParseResult<Record<string, unknown>>
  try {
    held = READING_SAID.safeParse(JSON.parse(said))
  } catch {
    return { refused: `\`${readingArgument.said}\` takes JSON, and what was said is none` }
  }
  if (held.success) return { answered: held.data }
  return { refused: `\`${readingArgument.said}\` takes what the check reads, keyed by name` }
}

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const story = held.story.trim()
  if (story === "") return { refused: `\`${storyArgument.said}\` names no story` }
  const check = held.settledCheck.trim()
  if (check === "") return { refused: `\`${checkArgument.said}\` names no check` }
  const dice = held.dice?.trim() ?? null
  if (dice === "") return { refused: `\`${diceArgument.said}\` names no dice` }
  const turn = held.playedTurn?.trim() ?? null
  if (turn === "") return { refused: `\`${turnArgument.said}\` names no turn` }
  const reading = readingIn(held.reading)
  if ("refused" in reading) return reading
  return {
    story,
    check,
    reading: reading.answered,
    dice,
    turn: turn === null ? null : turn.slice(turn.lastIndexOf(PARTED) + 1),
    drafts: held.draft,
  }
}
