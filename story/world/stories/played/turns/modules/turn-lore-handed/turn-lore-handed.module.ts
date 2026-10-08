import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLoreHanded = {
  id: "01a0f17a-cd74-7e4b-abcf-ece5c4c8f55f",
  type: "page-type/module",
  slug: "turn-lore-handed",
  definition: "which lore pages a world builder's advance may hand in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A world builder's advance names only lore pages, a place being one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page handed in is a page filed, and an address filing none is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the address it refuses.",
    },
  ],
  createdAt: "2026-09-30T08:42:32.180Z",
  updatedAt: "2026-09-30T08:43:28.000Z",
} as const satisfies Module
