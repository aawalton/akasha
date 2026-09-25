import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const setDropLocationNamesDe = {
  id: "01a0d8e1-0ebf-7c30-b4a8-0d201caf24b3",
  type: "page-type/text-property",
  slug: "set-drop-location-names-de",
  propertySlug: "set-drop-location-names-de",
  definition: "the German names the sets addon gives the places a set drops",
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
