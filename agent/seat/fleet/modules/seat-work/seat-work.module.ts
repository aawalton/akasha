import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatWork = {
  id: "01a0695a-d2ea-764d-9899-b8a6f4e9acd3",
  type: "page-type/module",
  slug: "seat-work",
  definition: "every initiative with the liveliest state among the seats working it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The louder of two seats is decided by the color each is drawn in rather than by its turn state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two seats drawn in one color are told apart by the order the turn states are read in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose turn state named no color to read is quieter than every color the ranking names.",
    },
  ],
} as const satisfies Module
