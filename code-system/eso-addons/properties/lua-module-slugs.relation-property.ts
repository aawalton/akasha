import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type LuaModuleSlugs = List<Slug>

export const luaModuleSlugs = {
  id: "01a06036-9b78-76a0-8492-89abe6853e5a",
  pageTypeSlug: "relation-property",
  slug: "lua-module-slugs",
  propertySlug: "lua-module-slugs",
  definition: "the Lua modules an addon loads",
  targetPageTypeSlug: "page-type/lua-module",
} as const satisfies RelationProperty
