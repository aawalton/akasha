import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const setDropLocationNamesEn = {
  id: "01a0d8e1-0ebf-7654-a560-4695cab04d3a",
  type: "page-type/text-property",
  slug: "set-drop-location-names-en",
  propertySlug: "set-drop-location-names-en",
  definition: "the English names the sets addon gives the places a set drops",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name sits at the place its drop way has, and an empty name holds a place.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
