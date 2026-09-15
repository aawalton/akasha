import type { ComponentPropertyGroupStated } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.types.ts"

export type PropertyRowComponent = ComponentPropertyGroupStated

export const propertyRowComponent = {
  id: "01a09c8e-de72-7605-a886-1f7e855a63dc",
  type: "page-type/component-property-group",
  slug: "property-row-component",
  propertySlug: "property-row-component",
  definition:
    "the component drawing as a row a value a page of this page type carries, with its label",
} as const satisfies ComponentPropertyGroup
