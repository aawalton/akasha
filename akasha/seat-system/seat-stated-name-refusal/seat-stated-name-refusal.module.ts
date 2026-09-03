import type { Module } from "@akasha/code-system/module"

export const seatStatedNameRefusal = {
  id: "01a0686d-9d5e-7012-94c3-843ea0bdf815",
  pageTypeSlug: "module",
  slug: "seat-stated-name-refusal",
  definition: "the refusal a seat start meets when it types a name beside the attributes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's name is composed from what the seat is rather than typed beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A first argument that is a flag is no stated name.",
    },
    {
      invariantKind: "departure",
      statement: "A call stating no name is refused nothing.",
    },
  ],
} as const satisfies Module
