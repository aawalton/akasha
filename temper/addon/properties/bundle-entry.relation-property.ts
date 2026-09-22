import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const bundleEntry = {
  id: "01a060e4-5184-70a7-91ff-37d5b94a8d86",
  type: "page-type/relation-property",
  slug: "bundle-entry",
  propertySlug: "bundle-entry",
  definition: "the module where the transpiler starts an addon's Lua file",
  targetPageType: "page-type/module",
  types: "ts",
} as const satisfies RelationProperty
