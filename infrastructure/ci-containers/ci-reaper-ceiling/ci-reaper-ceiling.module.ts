import type { Module } from "@akasha/code-system/module"

export const ciReaperCeiling = {
  id: "01a06861-24c9-700d-affa-70d2ebb5ecf1",
  pageTypeSlug: "module",
  slug: "ci-reaper-ceiling",
  definition: "the time the reaper waits for an answer before giving up on it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wait past the ceiling throws what the runner ends the process on.",
    },
  ],
} as const satisfies Module
