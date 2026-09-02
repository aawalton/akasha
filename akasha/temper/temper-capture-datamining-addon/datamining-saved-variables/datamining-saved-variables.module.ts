import type { Module } from "@akasha/code-system/module"

export const dataminingSavedVariables = {
  id: "01a06341-d9e8-7003-86e4-05d88c5ad77a",
  pageTypeSlug: "module",
  slug: "datamining-saved-variables",
  definition: "the way the mined data is reached where the game keeps saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture writer hands this module the way in as the addon initializes.",
    },
    {
      invariantKind: "departure",
      statement: "A read before the capture writer has run is refused.",
    },
  ],
} as const satisfies Module
