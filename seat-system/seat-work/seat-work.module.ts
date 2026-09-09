import type { Module } from "@akasha/code/module"

export const seatWork = {
  id: "01a0695a-d2ea-764d-9899-b8a6f4e9acd3",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-work",
  definition: "every initiative with the liveliest state any seat working it is in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The louder of two seats is decided by the color each is drawn in rather than by its turn state.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two seats drawn in one color are told apart by the order the turn states are read in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat whose turn state named no color to read is quieter than every color the ranking names.",
    },
  ],
} as const satisfies Module
