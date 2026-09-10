import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Lua50Config = "json"

export const lua50Config = {
  id: "01a06759-2aa6-7002-bb81-e64cbb1d51e4",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "lua50-config",
  propertySlug: "lua50-config",
  definition: "what a build for Lua 5.0 overlays the source tree with",
  fileName: "tsconfig.lua50.json",
} as const satisfies FileProperty
