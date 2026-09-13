import type { ComponentPropertyGroupStated } from "akasha/code/component-property-groups/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-groups/component-property-group.page-type.types.ts"

export type PageCardComponent = ComponentPropertyGroupStated

export const pageCardComponent = {
  id: "01a09c8e-abc3-7192-8d50-ae0082287e73",
  type: "component-property-group",
  slug: "page-card-component",
  propertySlug: "page-card-component",
  definition: "the component drawing a page of this page type as a card",
} as const satisfies ComponentPropertyGroup
