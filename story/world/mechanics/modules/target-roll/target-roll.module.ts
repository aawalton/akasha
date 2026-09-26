import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetRoll = {
  id: "01a0de83-5fcb-7479-b056-95d371a4aa2e",
  type: "page-type/module",
  slug: "target-roll",
  definition: "whether a roll with its modifiers meets a target, and by how much",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The total is the roll plus an attribute, a rank and every bonus counted in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A total meeting its target succeeds, and its margin says by how much.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows how a story sets a target.",
    },
  ],
} as const satisfies Module
