import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Says = "txt"

export const says = {
  id: "01a0657a-fe00-7658-9382-7d3fe5d60f0d",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "says",
  propertySlug: "says",
  definition: "what a note says",
} as const satisfies FileProperty
