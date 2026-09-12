import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type {
  Commanding,
  Naming,
  Taken,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  takenFor,
  takingIn,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"

export const CALLED_AS = "akasha thing"

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

export function pageTaken(
  argv: readonly string[],
  page: Commanding,
  pages: readonly Argument[]
): Taken {
  const read = takenFor(argv, CALLED_AS, page, pages)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  return read.taken as Taken
}

export function pageRefusals(
  argv: readonly string[],
  page: Commanding,
  pages: readonly Argument[]
): readonly string[] {
  const read = takenFor(argv, CALLED_AS, page, pages)
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  return read.refused
}

export function argumentOf(slug: string, value: Argument["value"]): Argument {
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

export const VIDEO = argumentOf("video", "path")

export const FRAMES_DIR = argumentOf("frames-dir", "path")

export const ONE_OF_THEM: readonly Naming[] = [
  { argument: VIDEO, notWith: [FRAMES_DIR] },
  { argument: FRAMES_DIR },
]

export const FROM: Naming = { argument: argumentOf("from", "text"), saidAs: "word" }

export const ONTO: Naming = { argument: argumentOf("onto", "text"), saidAs: "word" }

export const REST: Naming = { argument: argumentOf("rest", "text"), saidAs: "word", repeats: true }

export const DRY_RUN_PAGE = {
  id: "01a09400-0000-7000-8000-000000000001",
  type: "argument",
  slug: "dry-run",
  said: "--dry-run",
  takes: "what dry-run is for",
  value: "none",
} as const satisfies Argument

export const SEAT_PAGE = {
  id: "01a09400-0000-7000-8000-000000000002",
  type: "argument",
  slug: "seat",
  said: "--seat",
  takes: "what seat is for",
  value: "text",
} as const satisfies Argument

export const LIMIT_PAGE = {
  id: "01a09400-0000-7000-8000-000000000003",
  type: "argument",
  slug: "limit",
  said: "--limit",
  takes: "what limit is for",
  value: "whole-number",
} as const satisfies Argument

export const TO_PAGE = {
  id: "01a09400-0000-7000-8000-000000000004",
  type: "argument",
  slug: "to",
  said: "--to",
  takes: "what to is for",
  value: "text",
} as const satisfies Argument

export const TAIL_PAGE = {
  id: "01a09400-0000-7000-8000-000000000005",
  type: "argument",
  slug: "tail",
  said: "--tail",
  takes: "what tail is for",
  value: "whole-number",
  default: "100",
} as const satisfies Argument

export const PAGES = [DRY_RUN_PAGE, SEAT_PAGE, LIMIT_PAGE, TO_PAGE]

export const NAMING_TAIL = { slug: "thing", arguments: [{ argument: "argument/tail" }] } as const

export const NAMING_THEM = {
  slug: "thing",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/seat", required: true },
    { argument: "argument/limit" },
    { argument: "argument/to", repeats: true },
  ],
} as const

export const NAMING_NONE = { slug: "nothing" } as const

export const TO_POSITION = argumentOf("to-position", "whole-number")

export const BEFORE = argumentOf("before", "text")

export const AFTER = argumentOf("after", "text")

export const ONE_OF_TWO: readonly Naming[] = [
  { argument: VIDEO, oneOf: [FRAMES_DIR] },
  { argument: FRAMES_DIR, oneOf: [VIDEO] },
]

export const SAID_NEITHER =
  "`akasha thing` takes `--video` or `--frames-dir`, and nothing said either"

export const NO_VALUE = "`--limit` takes a value, and none follows it"

export const NOT_BOTH =
  "`--video` and `--frames-dir` are never said together, and this call says both"

export const NO_NOPE = "`--nope` is no argument `akasha thing` takes — it takes `--limit`"

export const ONE_OF_SPELT: readonly Naming[] = [
  { argument: argumentOf("node", "text"), saidAs: "flag-or-word", oneOf: [VIDEO] },
  { argument: VIDEO },
]

export const ONE_OF_THREE: readonly Naming[] = [
  { argument: TO_POSITION, oneOf: [BEFORE, AFTER] },
  { argument: BEFORE, oneOf: [TO_POSITION, AFTER] },
  { argument: AFTER, oneOf: [TO_POSITION, BEFORE] },
]

export const NAMING_ONE_OF = {
  slug: "thing",
  arguments: [
    { argument: "argument/seat", oneOf: ["argument/limit"] },
    { argument: "argument/limit", oneOf: ["argument/seat"] },
  ],
} as const

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

export const NAMING_WORD = {
  slug: "thing",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
} as const

export const NAMING_NOT_WITH = {
  slug: "thing",
  arguments: [
    { argument: "argument/seat", notWith: ["argument/limit"] },
    { argument: "argument/limit" },
  ],
} as const

export const NAMED_PART = "argument/"

export function saidForPart(pages: readonly Argument[], part: string): string {
  const held = pages.find((one) => one.slug === part.slice(NAMED_PART.length))
  if (held === undefined) {
    throw new Error(`\`${part}\` is declared and no argument page was handed in for it`)
  }
  return held.said
}
