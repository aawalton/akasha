import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasureApi = {
  id: "01a061d5-d0c0-73e1-8312-b0bc2d8d34a1",
  type: "page-type/module",
  slug: "treasure-api",
  definition: "what the bundle asks about a treasure map or a survey",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "The lore book lookup answers nothing for any book.",
    },
  ],
} as const satisfies Module
