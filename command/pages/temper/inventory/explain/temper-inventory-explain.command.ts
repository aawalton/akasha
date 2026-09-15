import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryExplain = {
  id: "01a0603c-c1d2-7c24-8d3d-7d9bb02c2690",
  type: "page-type/command",
  slug: "temper-inventory-explain",
  definition: "the command tracing why an item resolves to the action the rules give it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The walk is reported in priority order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first rule that matches decides the action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item rule written against the item decides the action before any ordered rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the player locked in game is decided by the ordered rules alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming no character lets the freshest scan win.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item no scan has refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The junk state the scan captured is carried into the account of the item.",
    },
  ],
  name: "explain",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
    { argument: "argument/char" },
    { argument: "argument/item", required: true, saidAs: "word" },
  ],
} as const satisfies Command
