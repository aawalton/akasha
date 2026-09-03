import type { Module } from "@akasha/code-system/module"

export const composeSeatName = {
  id: "01a06949-b281-7447-ab77-9ecbb5f9f139",
  pageTypeSlug: "module",
  slug: "compose-seat-name",
  definition: "the name a seat goes by, spelled from the attributes the seat holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose role is handler is named for its domain alone.",
    },
    {
      invariantKind: "departure",
      statement: "A seat of Alan's is named for its persona where that persona is not the default.",
    },
    {
      invariantKind: "departure",
      statement: "An empty attribute is left out of the name the same way a missing one is.",
    },
    {
      invariantKind: "departure",
      statement: "The name is the parts that remain joined with a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no part remaining has no name.",
    },
    {
      invariantKind: "departure",
      statement: "A flex spelled anything but flex- followed by a whole number gives no name.",
    },
  ],
} as const satisfies Module
