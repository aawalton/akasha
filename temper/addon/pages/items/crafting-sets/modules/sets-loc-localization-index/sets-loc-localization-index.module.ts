import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocLocalizationIndex = {
  id: "01a061d7-7bba-7684-b634-224b2592273f",
  type: "page-type/module",
  slug: "sets-loc-localization-index",
  definition: "an import that runs the first languages' localization install",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has a single import and declares nothing.",
    },
  ],
} as const satisfies Module
