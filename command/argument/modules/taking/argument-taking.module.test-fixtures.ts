import { argument } from "akasha/command/argument/argument.page-type.ts"
import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"
import type { Commanding } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import type { Taken } from "akasha/command/argument/modules/word-reading/argument-word-reading.module.code.ts"
import { dryRun as dryRunArgument } from "akasha/command/argument/pages/dry-run.argument.ts"
import { limit as limitArgument } from "akasha/command/argument/pages/limit.argument.ts"
import { seat as seatArgument } from "akasha/command/argument/pages/seat.argument.ts"
import { tail as tailArgument } from "akasha/command/argument/pages/tail.argument.ts"

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

const DRY_RUN_AT = `${argument.slug}/${dryRunArgument.slug}` as const

export const SEAT_AT = `${argument.slug}/${seatArgument.slug}` as const

export const LIMIT_AT = `${argument.slug}/${limitArgument.slug}` as const

const TAIL_AT = `${argument.slug}/${tailArgument.slug}` as const

export const NAMING_TAIL = { slug: "thing", arguments: [{ argument: TAIL_AT }] } as const

export const NAMING_THEM = {
  slug: "thing",
  arguments: [
    { argument: DRY_RUN_AT },
    { argument: SEAT_AT, required: true },
    { argument: LIMIT_AT },
    { argument: "argument/to", repeats: true },
  ],
} as const

export const NAMING_NONE = { slug: "nothing" } as const

export const NAMING_ONE_OF = {
  slug: "thing",
  arguments: [
    { argument: SEAT_AT, oneOf: [LIMIT_AT] },
    { argument: LIMIT_AT, oneOf: [SEAT_AT] },
  ],
} as const

export const NAMING_WORD = {
  slug: "thing",
  arguments: [{ argument: SEAT_AT, required: true, saidAs: "word" }],
} as const

export const NAMING_NOT_WITH = {
  slug: "thing",
  arguments: [{ argument: SEAT_AT, notWith: [LIMIT_AT] }, { argument: LIMIT_AT }],
} as const

const NAMED_PART = "argument/"

export function saidForPart(pages: readonly Argument[], part: string): string {
  const held = pages.find((one) => one.slug === part.slice(NAMED_PART.length))
  if (held === undefined) {
    throw new Error(`\`${part}\` is declared and no argument page was handed in for it`)
  }
  return held.said
}
