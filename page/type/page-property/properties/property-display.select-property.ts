import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const propertyDisplay = {
  id: "01a14f78-33ad-740c-852c-ea59d84b4c75",
  type: "page-type/select-property",
  slug: "property-display",
  propertySlug: "display",
  definition: "whether a property's value is drawn in a badge or as plain text",
  values: ["badge", "inline"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating nothing here is drawn in a badge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property drawn inline is drawn as its value alone, in every layout.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-18T14:44:00.044Z",
  updatedAt: "2026-10-18T14:44:00.044Z",
} as const satisfies SelectProperty
