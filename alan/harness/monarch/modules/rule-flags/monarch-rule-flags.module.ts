import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleFlags = {
  id: "01a18d84-fc83-788c-b125-c5d40f835860",
  type: "page-type/module",
  slug: "monarch-rule-flags",
  definition: "how code reads the flags of a command about category rules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount sign is positive or negative or nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other word is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value coming before any flag that value could belong to is refused rather than guessed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag may be given several times and has every value given.",
    },
  ],
  createdAt: "2026-10-30T15:54:25.282Z",
  updatedAt: "2026-10-30T15:54:25.282Z",
} as const satisfies Module
