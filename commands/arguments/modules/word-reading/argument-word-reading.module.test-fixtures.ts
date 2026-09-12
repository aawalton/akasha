import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type {
  Naming,
  Taken,
} from "akasha/commands/arguments/modules/word-reading/argument-word-reading.module.code.ts"
import { takingIn } from "akasha/commands/arguments/modules/word-reading/argument-word-reading.module.code.ts"

const CALLED_AS = "akasha thing"

export function taken(argv: readonly string[], naming: readonly Naming[]): Taken {
  const read = takingIn(argv, CALLED_AS, naming)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  return read.taken
}

export function refusals(argv: readonly string[], naming: readonly Naming[]): readonly string[] {
  const read = takingIn(argv, CALLED_AS, naming)
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  return read.refused
}

function argumentOf(slug: string, value: Argument["value"]): Argument {
  return {
    id: "01a09400-0000-7000-8000-000000000000",
    type: "argument",
    slug,
    said: `--${slug}`,
    takes: `what ${slug} is for`,
    value,
  } as Argument
}

export const DRY_RUN: Naming = { argument: argumentOf("dry-run", "none") }

export const LIMIT: Naming = { argument: argumentOf("limit", "whole-number") }

export const TO: Naming = { argument: argumentOf("to", "text"), repeats: true }

export const ACTIVE: Naming = { argument: argumentOf("active", "true-or-false") }

export const NODE: Naming = { argument: argumentOf("node", "text"), saidAs: "flag-or-word" }

export const COUNT: Naming = {
  argument: argumentOf("count", "whole-number"),
  saidAs: "flag-or-word",
}

export const SLUG: Naming = { argument: argumentOf("slug", "text"), saidAs: "word" }

const VIDEO = argumentOf("video", "path")

const FRAMES_DIR = argumentOf("frames-dir", "path")

export const ONE_OF_THEM: readonly Naming[] = [
  { argument: VIDEO, notWith: [FRAMES_DIR] },
  { argument: FRAMES_DIR },
]

export const FROM: Naming = { argument: argumentOf("from", "text"), saidAs: "word" }

export const ONTO: Naming = { argument: argumentOf("onto", "text"), saidAs: "word" }

export const REST: Naming = { argument: argumentOf("rest", "text"), saidAs: "word", repeats: true }

const TO_POSITION = argumentOf("to-position", "whole-number")

const BEFORE = argumentOf("before", "text")

const AFTER = argumentOf("after", "text")

export const ONE_OF_TWO: readonly Naming[] = [
  { argument: VIDEO, oneOf: [FRAMES_DIR] },
  { argument: FRAMES_DIR, oneOf: [VIDEO] },
]

export const ONE_OF_SPELT: readonly Naming[] = [
  { argument: argumentOf("node", "text"), saidAs: "flag-or-word", oneOf: [VIDEO] },
  { argument: VIDEO },
]

export const ONE_OF_THREE: readonly Naming[] = [
  { argument: TO_POSITION, oneOf: [BEFORE, AFTER] },
  { argument: BEFORE, oneOf: [TO_POSITION, AFTER] },
  { argument: AFTER, oneOf: [TO_POSITION, BEFORE] },
]

export const SAID_NEITHER =
  "`akasha thing` takes `--video` or `--frames-dir`, and nothing said either"

export const NO_VALUE = "`--limit` takes a value, and none follows it"

export const NOT_BOTH =
  "`--video` and `--frames-dir` are never said together, and this call says both"

export const NO_NOPE = "`--nope` is no argument `akasha thing` takes — it takes `--limit`"

export const DASH: Naming = {
  argument: { ...argumentOf("short", "text"), said: "-s" } as Argument,
}

export const EACH_STATING: readonly Naming[] = [
  { argument: VIDEO, notWith: [FRAMES_DIR] },
  { argument: FRAMES_DIR, notWith: [VIDEO] },
]

export const PLACED: Naming = {
  argument: { ...argumentOf("node", "text"), placeholder: "id" } as Argument,
  saidAs: "word",
  required: true,
}

const AGENT_ID = argumentOf("agent-id", "text")

const STATE = argumentOf("state", "text")

export const WORD_AND_FLAG: readonly Naming[] = [
  { argument: AGENT_ID, repeats: true, saidAs: "word", notWith: [STATE] },
  { argument: STATE, repeats: true },
]
