import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const towerState = {
  id: "01a05bc6-fa4a-7004-9c22-02086b08836f",
  pageTypeSlug: "module",
  slug: "tower-state",
  definition: "the shape a tower game's saved state, its log and its chapters are stored in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A beat is narrative or system.",
    },
    {
      invariantKind: "departure",
      statement: "A beat is named by a string that is never empty.",
    },
    {
      invariantKind: "departure",
      statement: "An illustration is anchored to the beat the illustration stands at.",
    },
  ],
} as const satisfies Module
