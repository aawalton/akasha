import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GameEngine = string

export const gameEngine = {
  id: "01a0673c-8e0e-7000-9766-2ad03b196843",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "game-engine",
  propertySlug: "game-engine",
  definition: "the engine a game is run on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The engine a game names settles how that game's page draws.",
    },
  ],
} as const satisfies TextProperty
