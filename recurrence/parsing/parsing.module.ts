import type { Module } from "@akasha/code-system/module"

export const parsing = {
  id: "01a05c6f-c7c3-7f40-b36e-54f054cb61d6",
  pageTypeSlug: "module",
  slug: "parsing",
  definition: "an `every ...` phrase read into an rrule and a time of day",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phrase not opening with `every` reads as absent rather than as an error.",
    },
    {
      invariantKind: "departure",
      statement:
        "`every!` marks a rule anchored at completion rather than at the day the repeating thing was due.",
    },
    {
      invariantKind: "departure",
      statement: "A trailing `at <time>` is taken off the phrase and answered beside the rule.",
    },
    {
      invariantKind: "departure",
      statement: "A time is answered as twenty-four hour `HH:MM` however the time was written.",
    },
  ],
} as const satisfies Module
