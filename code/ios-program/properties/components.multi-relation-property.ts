import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const components = {
  id: "01a05821-5723-7bc2-86dc-1b02cd1edded",
  type: "page-type/multi-relation-property",
  slug: "components",
  propertySlug: "components",
  definition: "the components a program compiles",
  targetPageType: "page-type/ios-component",
  types: "ts",
} as const satisfies MultiRelationProperty
