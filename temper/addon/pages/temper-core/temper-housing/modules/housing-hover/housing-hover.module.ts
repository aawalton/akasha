import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingHover = {
  id: "01a06128-d5ce-79e1-bfae-231c44c3e43b",
  type: "page-type/module",
  slug: "housing-hover",
  definition: "what a housing row shows while the pointer is over it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row under the pointer is marked by a backdrop color rather than by changed text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That color is the light window-rows gives a row pointed at.",
    },
  ],
} as const satisfies Module
