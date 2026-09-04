import type { FileProperty } from "@akasha/pages-system/file-property"

export type GateDimensions = "json"

export const gateDimensions = {
  id: "01a06590-c57a-7c46-a898-fce1098205be",
  pageTypeSlug: "file-property",
  slug: "gate-dimensions",
  propertySlug: "gate-dimensions",
  definition: "what a turn is judged on before the turn is published",
} as const satisfies FileProperty
