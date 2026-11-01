import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftDeconstructionFilter = {
  id: "01a19896-0c6e-7a0d-afb0-f8a888524455",
  type: "page-type/module",
  slug: "craft-deconstruction-filter",
  definition: "the filters narrowing the keyboard deconstruction list at a station",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each filter narrows the list by itself, and filters turned on together all apply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The 25-crystal filter keeps set items whose set costs 25 crystals to reconstruct.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The quality filter reads display quality, so mythic is told apart from legendary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every filter's state is kept in the saved variables and survives a reload.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the gamepad deconstruction list.",
    },
  ],
  createdAt: "2026-11-01T19:28:52.845Z",
  updatedAt: "2026-11-01T19:28:52.845Z",
} as const satisfies Module
