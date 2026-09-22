import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lua50Config = {
  id: "01a06759-2aa6-7002-bb81-e64cbb1d51e4",
  type: "page-type/file-property",
  slug: "lua50-config",
  propertySlug: "lua50-config",
  definition: "what a build for Lua 5.0 lays over the source tree",
  extensions: ["json"],
  fileName: "tsconfig.lua50.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
