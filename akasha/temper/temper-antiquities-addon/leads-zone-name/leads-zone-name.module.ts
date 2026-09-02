import type { Module } from "@akasha/code-system/module"

export const leadsZoneName = {
  id: "01a06274-b08a-7546-b923-d5ea415aa870",
  pageTypeSlug: "module",
  slug: "leads-zone-name",
  definition: "the name a lead's zone is shown under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lead spanning two zones is shown under both names joined.",
    },
    {
      invariantKind: "departure",
      statement: "A zone the game has no id for is named here rather than by the game.",
    },
  ],
} as const satisfies Module
