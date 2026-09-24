import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCraftShortfall = {
  id: "01a0d4ac-7aff-775b-b639-3af515c95fd0",
  type: "page-type/module",
  slug: "inventory-craft-shortfall",
  definition: "what a crafting station crafts for the stocking rules that craft their shortfall",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type slots in as one resolver, and the flow here names no craft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resolver says its station, its categories, its item types and how it finds a craft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A found craft says the passives it needs, its yield, its most crafts and how to craft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule takes an item where the item's category and the rule's conditions both match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a craft makes is judged as not stolen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The crafts go through the writ queue after the writ crafts, so the station waits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The crafts are worked out again as each craft runs, from what is on hand then.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule crafting nothing for want of a recipe, a passive or materials says so in chat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A rule that already holds its target says nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule is named in chat by its id, since a compiled rule carries no title.",
    },
  ],
} as const satisfies Module
