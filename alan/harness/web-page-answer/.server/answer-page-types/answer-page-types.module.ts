import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerPageTypes = {
  id: "01a0640f-8510-78d4-a12e-20e2f4f3927a",
  type: "page-type/module",
  slug: "answer-page-types",
  definition: "how a website sends the page types a person can read to a browser",
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
  createdAt: "2026-09-02T21:38:53.840Z",
  updatedAt: "2026-10-30T16:05:27.060Z",
} as const satisfies Module
