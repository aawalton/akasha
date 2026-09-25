import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoEquipTypes = {
  id: "01a0d8bc-31d6-7ec5-becb-c3e73a06ccc1",
  type: "page-type/text-property",
  slug: "eso-equip-types",
  propertySlug: "eso-equip-types",
  definition: "the constants The Elder Scrolls Online names the equip slots of a set's pieces by",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type is read off the item link of a piece in the set's collection.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
