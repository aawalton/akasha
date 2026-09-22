import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const gameCharacters = {
  id: "01a0673e-1000-7000-9c11-6a2d4b8f0011",
  type: "page-type/file-property",
  slug: "game-characters",
  propertySlug: "characters",
  definition: "the characters a game is played with",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The rows here are what a game's entity pages were made from, and are no longer the authority.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is gone, and a character a player runs is an entity page.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
