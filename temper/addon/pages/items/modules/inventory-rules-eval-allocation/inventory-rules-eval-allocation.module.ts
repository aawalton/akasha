import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesEvalAllocation = {
  id: "01a06258-b532-7d68-85f1-0c0a81bc867f",
  type: "page-type/module",
  slug: "inventory-rules-eval-allocation",
  definition: "how a use action is split across characters, along the stock chain the rule names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The characters a by-priority leg takes are those in priority its eligibility passes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no priority compiled, the current character is the one character a leg takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg naming a character stocks that character alone, at every storage visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use allocation counts the copies other characters' captures hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A use allocation over the backpack counts the copies the bank and house storage hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use allocation over the bank counts the copies the live backpack holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A use allocation reads the current character's live bags rather than her capture.",
    },
  ],
} as const satisfies Module
