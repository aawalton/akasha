import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type { Naming } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"

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

export const PAGES = [DRY_RUN_PAGE, SEAT_PAGE, LIMIT_PAGE, TO_PAGE]

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
