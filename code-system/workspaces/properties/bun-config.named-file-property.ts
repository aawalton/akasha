import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type BunConfig = "toml"

export const bunConfig = {
  id: "01a06cd1-f990-70ec-8845-8d5a86c0e992",
  pageTypeSlug: "named-file-property",
  slug: "bun-config",
  propertySlug: "bun-config",
  definition: "what the package manager is told about this tree",
  fileName: "bunfig.toml",
} as const satisfies NamedFileProperty
