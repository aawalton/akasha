import type { ComponentPropertyGroupStated } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.types.ts"

export type PageCardComponent = ComponentPropertyGroupStated

export const pageCardComponent = {
  id: "01a09c8e-abc3-7192-8d50-ae0082287e73",
  type: "page-type/component-property-group",
  slug: "page-card-component",
  propertySlug: "page-card-component",
  definition: "the component drawing a page of this page type as a card",
  createdAt: "2026-09-13T20:56:30.915Z",
  updatedAt: "2026-09-15T16:25:50.000Z",
} as const satisfies ComponentPropertyGroup
