import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryExplain = {
  id: "01a0603c-c1d2-7c24-8d3d-7d9bb02c2690",
  type: "page-type/command",
  slug: "temper-inventory-explain",
  definition: "the command tracing why an item resolves to the action the rules give it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The walk is reported in priority order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first rule that matches decides the action.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An item rule written against the item decides the action before any ordered rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item the player locked in game is decided by the ordered rules alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming no character lets the freshest scan win.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item no scan has refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
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
