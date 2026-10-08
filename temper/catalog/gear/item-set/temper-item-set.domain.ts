import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemSet = {
  id: "01a090e4-78c9-7073-9166-03b462dd7c7e",
  type: "page-type/domain",
  slug: "temper-item-set",
  definition: "the item set collections the game's client answers about",
  parts: ["module/item-set-categories"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This code is compiled to Lua and runs inside the game.",
    },
  ],
  createdAt: "2026-09-11T14:34:47.369Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies Domain
