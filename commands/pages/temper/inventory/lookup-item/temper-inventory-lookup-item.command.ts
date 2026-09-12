import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryLookupItem = {
  id: "01a0603c-c1d5-767c-aabb-9b17518fac2a",
  type: "command",
  slug: "temper-inventory-lookup-item",
  definition: "the command finding an item in the captured holdings and saying what it is",
  code: "ts",
  taking: [
    { said: "<item>", takes: "the item looked up, as a bare item id or as a game item link" },
  ],

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
  arguments: [{ argument: "argument/json" }, { argument: "argument/inventory-path" }],
} as const satisfies Command
