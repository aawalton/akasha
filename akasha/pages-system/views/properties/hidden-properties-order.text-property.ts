import type { TextProperty } from "@akasha/pages-system/text-property"

export type HiddenPropertiesOrder = string

export const hiddenPropertiesOrder = {
  id: "01a0680d-4d00-700c-a856-2e9f4b7d410d",
  pageTypeSlug: "text-property",
  slug: "hidden-properties-order",
  propertySlug: "hidden-properties-order",
  definition: "the properties a view hides, in the order a person would reach them",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A view carries the order its properties are shown in, the hidden ones among them.",
    },
  ],
} as const satisfies TextProperty
