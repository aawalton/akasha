import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const engineGlobalsCatalog = {
  id: "01a0ca9b-a3a0-7ec2-86bc-abbb99ef6d88",
  type: "page-type/module",
  slug: "engine-globals-catalog",
  definition: "the shape the game's own constants are written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant is kept under the name the game holds that constant under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number and a word are kept apart, because Lua tells them apart and JSON does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names of the constants holding words are kept apart from the words again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the game answers with is kept beside the constants it gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name of the function the constants were listed with is kept beside them.",
    },
  ],
} as const satisfies Module
