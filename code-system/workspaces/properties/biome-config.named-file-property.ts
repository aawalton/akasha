import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type BiomeConfig = "json"

export const biomeConfig = {
  id: "01a06cd1-f98f-7d46-aecf-f86e2e853c03",
  pageTypeSlug: "named-file-property",
  slug: "biome-config",
  propertySlug: "biome-config",
  definition: "what the formatter and the linter are told about this tree",
  fileName: "biome.json",
} as const satisfies NamedFileProperty
