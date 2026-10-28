import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildGear = {
  id: "01a18445-63e2-7293-880b-b59e05fda236",
  type: "page-type/module",
  slug: "characters-build-gear",
  definition: "equipping a character's target gear from that character's bags",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece matches its target by set and, where the target names one, trait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece is taken only from the backpack, and only where its type fits the slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pieces are equipped one at a time, half a second apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target piece found nowhere in the backpack is named.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes gear from the bank or makes gear.",
    },
  ],
  createdAt: "2026-10-28T20:48:22.497Z",
  updatedAt: "2026-10-28T20:48:22.497Z",
} as const satisfies Module
