import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RustModuleSlugs = List<Slug>

export const rustModuleSlugs = {
  id: "01a0602d-6ad1-75bd-afd3-a951482bc17a",
  pageTypeSlug: "relation-property",
  slug: "rust-module-slugs",
  propertySlug: "module-slugs",
  definition: "the modules a crate compiles",
  targetPageTypeSlug: "page-type/rust-module",
} as const satisfies RelationProperty
