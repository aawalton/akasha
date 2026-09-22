import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const gameEngine = {
  id: "01a0673c-8e0e-7000-9766-2ad03b196843",
  type: "page-type/text-property",
  slug: "game-engine",
  propertySlug: "game-engine",
  definition: "a game's engine",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The engine a game names settles how that game's page draws.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
