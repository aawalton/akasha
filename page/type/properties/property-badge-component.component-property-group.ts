import type { ComponentPropertyGroupStated } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.types.ts"

export type PropertyBadgeComponent = ComponentPropertyGroupStated

export const propertyBadgeComponent = {
  id: "01a09c8e-c702-74c4-8a8f-9eaa7cffc238",
  type: "component-property-group",
  slug: "property-badge-component",
  propertySlug: "property-badge-component",
  definition: "the component drawing as a badge a value a page of this page type carries",
} as const satisfies ComponentPropertyGroup
