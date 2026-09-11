import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const visibleProperties = {
  id: "01a0680d-4d00-700a-b249-6c8e4a3f410b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "visible-properties",
  propertySlug: "visible-properties",
  definition: "the properties a view draws",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is named by the key its declaration states.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
