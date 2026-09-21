import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const entityKind = {
  id: "01a0c632-9753-7529-a95f-ebc4de76b7df",
  type: "page-type/text-property",
  slug: "entity-kind",
  propertySlug: "kind",
  definition: "what part of its game's world this is: a player, an enemy, a partner, a creature",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds an entity may be are its game's own words rather than one list.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A game says which of its kinds the player runs.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
