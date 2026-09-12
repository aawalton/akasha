import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type { Commanding } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import type { Taken } from "akasha/commands/arguments/word-reading/argument-word-reading.module.code.ts"

export const CALLED_AS = "akasha thing"

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

const DRY_RUN_PAGE = {
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

const TO_PAGE = {
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

export const NAMING_ONE_OF = {
  slug: "thing",
  arguments: [
    { argument: "argument/seat", oneOf: ["argument/limit"] },
    { argument: "argument/limit", oneOf: ["argument/seat"] },
  ],
} as const

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

const NAMED_PART = "argument/"

export function saidForPart(pages: readonly Argument[], part: string): string {
  const held = pages.find((one) => one.slug === part.slice(NAMED_PART.length))
  if (held === undefined) {
    throw new Error(`\`${part}\` is declared and no argument page was handed in for it`)
  }
  return held.said
}
