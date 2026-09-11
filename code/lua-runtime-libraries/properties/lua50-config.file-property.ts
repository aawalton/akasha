import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const lua50Config = {
  id: "01a06759-2aa6-7002-bb81-e64cbb1d51e4",
  type: "file-property",
  slug: "lua50-config",
  propertySlug: "lua50-config",
  definition: "what a build for Lua 5.0 overlays the source tree with",
  extensions: ["json"],
  fileName: "tsconfig.lua50.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
