import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const rustModules = {
  id: "01a0602d-6ad1-75bd-afd3-a951482bc17a",
  type: "page-type/multi-relation-property",
  slug: "rust-modules",
  propertySlug: "modules",
  definition: "the modules a crate compiles",
  targetPageType: "page-type/rust-module",
  types: "ts",
} as const satisfies MultiRelationProperty
