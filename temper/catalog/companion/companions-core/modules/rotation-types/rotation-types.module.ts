import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotationTypes = {
  id: "01a06152-c2da-7a46-9d70-0b6d3eec75de",
  type: "page-type/module",
  slug: "rotation-types",
  definition: "the vocabulary of a companion rotation simulation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Rotation state is a mutable record the simulator writes through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timing the game holds a rotation to is read from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a fight is modelled stays here, in the one default rotation config.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The default target armor is read from the dungeon entry of the target armor table.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A rotation skill identifier admits the literal light-attack alongside real skill ids.",
    },
  ],
} as const satisfies Module
