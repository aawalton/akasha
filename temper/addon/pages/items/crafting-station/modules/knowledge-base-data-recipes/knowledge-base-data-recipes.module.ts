import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeBaseDataRecipes = {
  id: "01a0622b-dc52-79f4-bce0-fd2f65450465",
  type: "page-type/module",
  slug: "knowledge-base-data-recipes",
  definition: "the pre-scanned item ids upstream ships for provisioning recipes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These ids are the ids upstream BaseData for API 101050 states.",
    },
  ],
} as const satisfies Module
