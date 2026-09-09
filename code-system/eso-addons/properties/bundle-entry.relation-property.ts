import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type BundleEntry = Slug

export const bundleEntry = {
  id: "01a060e4-5184-70a7-91ff-37d5b94a8d86",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "bundle-entry",
  propertySlug: "bundle-entry",
  definition: "the module the transpiler starts an addon's one Lua file from",
  targetPageType: "page-type/module",
} as const satisfies RelationProperty
