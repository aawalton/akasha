import type { Module } from "@akasha/code-system/module"

export const ciReaperTick = {
  id: "01a06861-24c9-7015-9f8d-b7d1d1d01de3",
  pageTypeSlug: "module",
  slug: "ci-reaper-tick",
  definition: "one pass of the reaper over every container in the ci namespace",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step's own verdict is not written here.",
    },
  ],
} as const satisfies Module
