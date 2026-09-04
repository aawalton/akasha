import type { FileProperty } from "@akasha/pages-system/file-property"

export type GameCharacters = "jsonl"

export const gameCharacters = {
  id: "01a0673e-1000-7000-9c11-6a2d4b8f0011",
  pageTypeSlug: "file-property",
  slug: "game-characters",
  propertySlug: "characters",
  definition: "the characters a game is played with",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
  ],
} as const satisfies FileProperty
