import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerPageTypes = {
  id: "01a0640f-8510-78d4-a12e-20e2f4f3927a",
  type: "page-type/module",
  slug: "answer-page-types",
  definition: "the page types answered to a browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is named here where the reader holds an access reaching it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same accesses settle this roster and the pages of a type, so the two agree.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A browser reads no page type this leaves out, so leaving one out serves nothing.",
    },
  ],
} as const satisfies Module
