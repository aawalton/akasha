import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const correctHanding = {
  id: "01a1831e-d939-77e6-8e0c-52e1e83e50f6",
  type: "page-type/module",
  slug: "correct-handing",
  definition: "what a correction's call hands in for the one beat it corrects",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction's changes file holds the beat's whole changes, one json change a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty changes file corrects the beat to change nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A correction's prose file holds the beat's prose as text or as one prose record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Prose handed in as text keeps whether the beat continued the paragraph before it.",
    },
  ],
  createdAt: "2026-10-28T15:26:39.416Z",
  updatedAt: "2026-10-28T15:26:39.416Z",
} as const satisfies Module
