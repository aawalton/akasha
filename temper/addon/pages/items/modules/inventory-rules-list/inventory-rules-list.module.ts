import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesList = {
  id: "01a06258-b533-7b03-9ccc-7c38e13144d0",
  type: "page-type/module",
  slug: "inventory-rules-list",
  definition: "listing items at the guild trader by rule, and reading the posting response",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each item is listed through the same handshake the price window lists through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is counted as listed only once the game answers that the post succeeded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item whose post failed keeps its listing action for the next visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an item in the backpack is listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item with no price or that the store refuses is held rather than listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held item keeps its listing action, so the plan keeps showing why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller is told once listing at a visit is over, whatever listing did.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.859Z",
  updatedAt: "2026-10-10T14:27:06.302Z",
} as const satisfies Module
