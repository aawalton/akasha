import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const biomeConfig = {
  id: "01a06cd1-f98f-7d46-aecf-f86e2e853c03",
  type: "file-property",
  slug: "biome-config",
  propertySlug: "biome-config",
  definition: "what the formatter and the linter are told about this tree",
  extensions: ["json"],
  fileName: "biome.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
