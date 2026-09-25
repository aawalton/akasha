import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoArmorTypes = {
  id: "01a0d8bc-31d5-75b6-a61b-ed960bf34e03",
  type: "page-type/text-property",
  slug: "eso-armor-types",
  propertySlug: "eso-armor-types",
  definition: "the constants The Elder Scrolls Online names the armor weights of a set's pieces by",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight is read off the item link of a piece in the set's collection.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A piece the game gives no armor weight adds no constant here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
