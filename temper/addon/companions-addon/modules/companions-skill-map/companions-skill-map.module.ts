import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSkillMap = {
  id: "01a0611d-84e2-7459-a5ca-157255030bb6",
  type: "page-type/module",
  slug: "companions-skill-map",
  definition: "which index the build codec gives each companion ability the game knows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An ability's index here is the index a saved build hash has.",
    },
  ],
} as const satisfies Module
