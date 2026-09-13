import type { ComponentPropertyGroupStated } from "akasha/code/component-property-groups/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-groups/component-property-group.page-type.types.ts"

export type PageBadgeComponent = ComponentPropertyGroupStated

export const pageBadgeComponent = {
  id: "01a09c8e-6aab-7646-88d4-0a1ddc229eb0",
  type: "component-property-group",
  slug: "page-badge-component",
  propertySlug: "page-badge-component",
  definition: "the component drawing a page of this page type as a chip",
} as const satisfies ComponentPropertyGroup
