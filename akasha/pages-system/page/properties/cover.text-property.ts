import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type Cover = string

export const cover = {
  id: "01a0539d-94a2-71f8-83d3-2c8cd1f8db2e",
  pageTypeSlug: "text-property",
  slug: "cover",
  propertySlug: "cover",
  definition: "the image that stands for a page",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds the route a picture is fetched by rather than the picture itself.",
    },
  ],
} as const satisfies TextProperty
