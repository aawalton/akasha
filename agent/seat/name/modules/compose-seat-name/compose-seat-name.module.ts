import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeSeatName = {
  id: "01a06949-b281-7447-ab77-9ecbb5f9f139",
  type: "page-type/module",
  slug: "compose-seat-name",
  definition: "the name a seat goes by, spelled from the attributes the seat has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose role is handler is named for its domain alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat of Alan's whose domain is a game is named for its persona, its role and that game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any other seat of Alan's is named for its persona where that persona is not the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty attribute is left out of the name the same way a missing attribute is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is the parts that remain joined with a hyphen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no part remaining has no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flex spelled anything but flex- followed by a whole number gives no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name that is exactly a person's slug is that person's rather than a spelling of the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name that is no person's slug moves with the attributes that name was composed from.",
    },
  ],
} as const satisfies Module
