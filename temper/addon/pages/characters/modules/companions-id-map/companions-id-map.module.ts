import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsIdMap = {
  id: "01a0611d-84dd-7991-bda4-54827db48eac",
  type: "page-type/module",
  slug: "companions-id-map",
  definition: "which index the build codec gives each companion the game knows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A companion's index here is the index a saved build hash carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's index is the build-hash place its companion page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The id map lists the companions in the order of those places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list a player reads names the companions in the order of their keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page at place zero is no companion, and is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on reads the companion pages as it compiles.",
    },
  ],
} as const satisfies Module
