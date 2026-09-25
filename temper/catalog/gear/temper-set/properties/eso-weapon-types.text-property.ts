import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoWeaponTypes = {
  id: "01a0d8bc-31d7-7264-be98-dfe8be6e90a0",
  type: "page-type/text-property",
  slug: "eso-weapon-types",
  propertySlug: "eso-weapon-types",
  definition: "the constants The Elder Scrolls Online names the weapon kinds of a set's pieces by",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon kind is read off the item link of a piece in the set's collection.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A piece the game gives no weapon kind adds no constant here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
