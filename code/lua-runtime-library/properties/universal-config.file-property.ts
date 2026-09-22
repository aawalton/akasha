import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const universalConfig = {
  id: "01a06759-2aa6-7001-aea3-4833f5efff0d",
  type: "page-type/file-property",
  slug: "universal-config",
  propertySlug: "universal-config",
  definition: "what a build for every Lua but 5.0 lays over the source tree",
  extensions: ["json"],
  fileName: "tsconfig.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
