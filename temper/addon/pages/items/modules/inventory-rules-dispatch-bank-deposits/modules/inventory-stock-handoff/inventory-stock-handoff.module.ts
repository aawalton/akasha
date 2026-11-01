import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryStockHandoff = {
  id: "01a198b0-d3c1-78a9-9c70-efabb3f91118",
  type: "page-type/module",
  slug: "inventory-stock-handoff",
  definition: "how much stock the other characters are short of, read from their last captures",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What another character holds toward a stocking rule is read from that character's last capture.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "That holding is counted by the item deposited rather than by the whole rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the bank holds is read from the bank's last capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chain the bank is a tier of hands off through that tier, so the carrier adds nothing.",
    },
  ],
  createdAt: "2026-11-01T19:58:07.808Z",
  updatedAt: "2026-11-01T19:58:07.808Z",
} as const satisfies Module
