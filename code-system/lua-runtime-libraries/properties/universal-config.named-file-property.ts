import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type UniversalConfig = "json"

export const universalConfig = {
  id: "01a06759-2aa6-7001-aea3-4833f5efff0d",
  pageTypeSlug: "named-file-property",
  slug: "universal-config",
  propertySlug: "universal-config",
  definition: "what a build for every Lua but 5.0 overlays the source tree with",
  fileName: "tsconfig.json",
} as const satisfies NamedFileProperty
