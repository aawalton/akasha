import type { TextProperty } from "@akasha/pages-system/text-property"

export type VisibleProperties = string

export const visibleProperties = {
  id: "01a0680d-4d00-700a-b249-6c8e4a3f410b",
  pageTypeSlug: "text-property",
  slug: "visible-properties",
  propertySlug: "visible-properties",
  definition: "the properties a view draws",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is named by the key its declaration states.",
    },
  ],
} as const satisfies TextProperty
