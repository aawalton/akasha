import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsZoneName = {
  id: "01a06274-b08a-7546-b923-d5ea415aa870",
  type: "page-type/module",
  slug: "leads-zone-name",
  definition: "the name under which a lead's zone is shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead spanning two zones is shown under both names joined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone the game has no id for is named here rather than by the game.",
    },
  ],
} as const satisfies Module
