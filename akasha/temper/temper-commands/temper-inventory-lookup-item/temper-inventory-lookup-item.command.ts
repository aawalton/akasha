import type { Command } from "@akasha/command-system/command"

export const temperInventoryLookupItem = {
  id: "01a0603c-c1d5-767c-aabb-9b17518fac2a",
  pageTypeSlug: "command",
  slug: "temper-inventory-lookup-item",
  definition: "the command finding an item in the captured holdings and saying what it is",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<item>", takes: "the item looked up, as a bare item id or as a game item link" },
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the holdings are read from",
    },
    { said: "--json", takes: "give the answer as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the item is classified by the node ids the capture carries for it.",
    "an item the capture does not hold is refused by its id rather than reported as absent.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item is classified by the node ids the capture carries.",
    },
    {
      invariantKind: "departure",
      statement: "An item the capture does not hold refuses the call.",
    },
  ],
} as const satisfies Command
