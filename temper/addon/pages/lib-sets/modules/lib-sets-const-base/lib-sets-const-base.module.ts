import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsConstBase = {
  id: "01a061d6-3e1f-78d4-ae78-a17b737f3690",
  type: "page-type/module",
  slug: "lib-sets-const-base",
  definition: "the library table as it first exists, before any set data fills it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library table is imported here and published as a global here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "English is the language every other language falls back to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Japanese is listed among the languages and marked unsupported.",
    },
  ],
} as const satisfies Module
