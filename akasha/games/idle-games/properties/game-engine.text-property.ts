import type { TextProperty } from "@akasha/pages-system/text-property"

export type GameEngine = string

export const gameEngine = {
  id: "01a0658b-3654-724f-8014-15c0988fd259",
  pageTypeSlug: "text-property",
  slug: "game-engine",
  propertySlug: "game-engine",
  definition: "which engine runs a game",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The engine a game names settles how that game's page draws.",
    },
  ],
} as const satisfies TextProperty
