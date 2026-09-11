import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const potionTraits = {
  id: "01a06076-1b6c-7878-b299-8255b113ea93",
  pageTypeSlug: "module",
  type: "module",
  slug: "potion-traits",
  definition: "the number the game encodes each alchemy effect as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A potion's three effects pack into one number, a byte each, first effect highest.",
    },
    {
      invariantKind: "departure",
      statement: "A third reagent is the high bit of the first effect's byte.",
    },
    {
      invariantKind: "departure",
      statement: "A potion with no effect encodes as zero.",
    },
  ],
} as const satisfies Module
