import type { ComponentPropertyGroupStated } from "akasha/code/component-property-groups/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-groups/component-property-group.page-type.types.ts"

export type PageRowComponent = ComponentPropertyGroupStated

export const pageRowComponent = {
  id: "01a09c8e-8c45-7379-98ec-ac57fd8a29bc",
  type: "component-property-group",
  slug: "page-row-component",
  propertySlug: "page-row-component",
  definition: "the component drawing a page of this page type as a row",
} as const satisfies ComponentPropertyGroup
