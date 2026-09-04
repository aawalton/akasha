import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type BundleEntrySlug = Slug

export const bundleEntrySlug = {
  id: "01a060e4-5184-70a7-91ff-37d5b94a8d86",
  pageTypeSlug: "relation-property",
  slug: "bundle-entry-slug",
  propertySlug: "bundle-entry-slug",
  definition: "the module the transpiler starts an addon's one Lua file from",
  targetPageTypeSlug: "page-type/module",
} as const satisfies RelationProperty
