import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildChampion = {
  id: "01a18414-31e9-7e80-8607-c2f62bb1050e",
  type: "page-type/module",
  slug: "characters-build-champion",
  definition: "the champion points a target build asks for, worked out and bought in the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target star is wanted at the most points the game lets that star hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A discipline spends the points it has spent and the points it has unspent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stars are filled in the order the target names them, slotted stars first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A target star no point reaches is reached by unlocking the fewest stars on the shortest link path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star the target does not name is planned at no points unless a path needs it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A respec is asked for only where some star would hold fewer points than now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a star or a slot that changes is put in the purchase request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target slot left empty keeps whatever star is slotted there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request the game expects to refuse is never sent, and the game's reason is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A respec is paid in gold without a confirmation.",
    },
  ],
  createdAt: "2026-10-28T19:54:38.440Z",
  updatedAt: "2026-10-28T19:54:38.440Z",
} as const satisfies Module
