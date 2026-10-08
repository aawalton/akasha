import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocRestLocalizationRestIndex = {
  id: "01a061d7-7bc4-7579-be47-b39f086c097f",
  type: "page-type/module",
  slug: "sets-loc-rest-localization-rest-index",
  definition: "an import that runs the later languages' localization install",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has a single import and declares nothing.",
    },
  ],
  createdAt: "2026-09-02T11:18:27.012Z",
  updatedAt: "2026-09-22T10:19:01.000Z",
} as const satisfies Module
