import type { FileProperty } from "@akasha/pages-system/file-property"

export type Asks = "txt"

export const asks = {
  id: "01a0657a-fe00-7658-9382-7d3fe5d60f0d",
  pageTypeSlug: "file-property",
  slug: "asks",
  propertySlug: "asks",
  definition: "what a constraint asks for",
} as const satisfies FileProperty
