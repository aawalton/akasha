import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryExplain = {
  id: "01a0603c-c1d2-7c24-8d3d-7d9bb02c2690",
  type: "command",
  slug: "temper-inventory-explain",
  definition: "the command tracing why an item resolves to the action the rules give it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The walk is reported in priority order.",
    },
    {
      invariantKind: "departure",
      statement: "The first rule that matches decides the action.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no character lets the freshest scan win.",
    },
    {
      invariantKind: "departure",
      statement: "An item no scan has refuses the call.",
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
