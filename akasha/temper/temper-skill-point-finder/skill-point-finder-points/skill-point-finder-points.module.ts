import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderPoints = {
  id: "01a060ec-5840-7997-b3de-8ee2e8c8c629",
  pageTypeSlug: "module",
  slug: "skill-point-finder-points",
  definition: "how many skill points a character has earned against how many exist",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count is recomputed from what the game reports rather than accumulated.",
    },
  ],
} as const satisfies Module
