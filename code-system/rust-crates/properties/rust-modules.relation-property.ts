import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RustModules = List<Slug>

export const rustModules = {
  id: "01a0602d-6ad1-75bd-afd3-a951482bc17a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "rust-modules",
  propertySlug: "modules",
  definition: "the modules a crate compiles",
  targetPageType: "page-type/rust-module",
} as const satisfies RelationProperty
