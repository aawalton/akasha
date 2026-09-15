import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryLookupItem = {
  id: "01a0603c-c1d5-767c-aabb-9b17518fac2a",
  type: "page-type/command",
  slug: "temper-inventory-lookup-item",
  definition: "the command finding an item in the captured holdings and saying what it is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item is classified by the node ids the capture has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item the capture does not hold refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both the junk the game holds and the junk the game would allow are said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture recording neither says `not captured` rather than saying false.",
    },
  ],
  name: "lookup-item",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/item", required: true, saidAs: "word" },
  ],
} as const satisfies Command
