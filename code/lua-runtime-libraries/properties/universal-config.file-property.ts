import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const universalConfig = {
  id: "01a06759-2aa6-7001-aea3-4833f5efff0d",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "universal-config",
  propertySlug: "universal-config",
  definition: "what a build for every Lua but 5.0 overlays the source tree with",
  extensions: ["json"],
  fileName: "tsconfig.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
