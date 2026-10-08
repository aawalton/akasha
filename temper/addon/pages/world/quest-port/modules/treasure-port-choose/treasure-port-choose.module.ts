import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasurePortChoose = {
  id: "01a11cf5-8f69-7be4-8afa-63466646ca80",
  type: "page-type/module",
  slug: "treasure-port-choose",
  definition:
    "which treasure map or survey report the treasure port leads to, and where its spot is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The treasure taken is the first treasure map or survey report by backpack slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One function orders the slots, so display order can replace slot order there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A treasure whose spot Lost Treasure does not know is skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item keeps every distinct spot Lost Treasure knows for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spot moves between maps through the maps' places in the whole world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Distances on maps of different scale are compared in the whole world's measure.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls the game.",
    },
  ],
  createdAt: "2026-10-08T19:20:17.513Z",
  updatedAt: "2026-10-08T19:20:17.513Z",
} as const satisfies Module
