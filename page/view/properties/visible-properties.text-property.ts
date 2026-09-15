import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const visibleProperties = {
  id: "01a0680d-4d00-700a-b249-6c8e4a3f410b",
  type: "page-type/text-property",
  slug: "visible-properties",
  propertySlug: "visible-properties",
  definition: "the properties a view draws",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property is named by the key its declaration states.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
