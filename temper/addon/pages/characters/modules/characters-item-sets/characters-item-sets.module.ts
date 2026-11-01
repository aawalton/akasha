import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersItemSets = {
  id: "01a062ea-604a-7fad-b864-b1e6c8741e4e",
  type: "page-type/module",
  slug: "characters-item-sets",
  definition: "the item set collection of the account, read into the saved table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each set keeps the transmute crystals the game asks to reconstruct a piece of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every load reads each kept set's collected count and cost again.",
    },
  ],
  createdAt: "2026-09-02T16:18:42.378Z",
  updatedAt: "2026-11-01T14:24:19.756Z",
} as const satisfies Module
