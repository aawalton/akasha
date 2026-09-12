import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryLookupItem = {
  id: "01a0603c-c1d5-767c-aabb-9b17518fac2a",
  type: "command",
  slug: "temper-inventory-lookup-item",
  definition: "the command finding an item in the captured holdings and saying what it is",
  code: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An item is classified by the node ids the capture has.",
    },
    {
      invariantKind: "departure",
      statement: "An item the capture does not hold refuses the call.",
    },
  ],
  name: "lookup-item",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/item", required: true, saidAs: "word" },
  ],
} as const satisfies Command
