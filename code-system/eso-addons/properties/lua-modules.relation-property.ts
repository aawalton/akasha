import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const luaModules = {
  id: "01a06036-9b78-76a0-8492-89abe6853e5a",
  type: "relation-property",
  slug: "lua-modules",
  propertySlug: "lua-modules",
  definition: "the Lua modules an addon loads",
  targetPageType: "page-type/lua-module",
  types: "ts",
} as const satisfies RelationProperty
