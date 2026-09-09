import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type LuaModules = List<Slug>

export const luaModules = {
  id: "01a06036-9b78-76a0-8492-89abe6853e5a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "lua-modules",
  propertySlug: "lua-modules",
  definition: "the Lua modules an addon loads",
  targetPageType: "page-type/lua-module",
} as const satisfies RelationProperty
