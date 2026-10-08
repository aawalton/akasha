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
  createdAt: "2026-09-02T12:50:36.754Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
