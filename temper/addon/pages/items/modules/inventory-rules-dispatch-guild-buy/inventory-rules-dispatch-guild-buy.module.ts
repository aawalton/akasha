import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchGuildBuy = {
  id: "01a0e352-edcd-7365-bbbf-d6e0582757a8",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-guild-buy",
  definition: "buying at a guild store what the stocking rules buying their shortfall are short of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Buying at a guild store begins once listing at that visit is over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the guild store the player is at is searched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's items are searched for in the order of its item ids, one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming no item ids buys nothing at a guild store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item is searched for by its exact name, and only listings of that item are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing the rule does not take, or the player's own listing, is not bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search waits out the guild store's search cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A further page is read only while the last listing read was within its max price, up to three pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each item's buys are confirmed together where buying is confirmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Declining a confirmation ends buying at that visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Listings are bought one at a time, each after the one before it is answered.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Buying a listing takes no key press or click of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rule's buys spend from the gold the buys before them left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule short of its target that bought nothing says why in chat, item by item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Closing the guild store ends buying there.",
    },
  ],
} as const satisfies Module
