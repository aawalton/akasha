import type { Module } from "@akasha/code-system/module"

export const duringCall = {
  id: "01a05cb3-7cca-7613-8b60-5d8a19e74370",
  pageTypeSlug: "module",
  slug: "during-call",
  definition: "a value made once and held for as long as one run of a command lasts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run begun inside a run holds nothing of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A value asked for outside every run is made afresh.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what is worth holding.",
    },
    {
      invariantKind: "absence",
      statement: "Loading this module reaches nothing of node and makes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What keeps runs apart is reached at the first ask and kept.",
    },
    {
      invariantKind: "departure",
      statement: "Where node is absent nothing is held and every value is made afresh.",
    },
  ],
} as const satisfies Module
