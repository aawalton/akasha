import type { ComponentPropertyGroupStated } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.types.ts"

export type PageComponent = ComponentPropertyGroupStated

export const pageComponent = {
  id: "01a09c8e-401f-754c-b5fb-775347404752",
  type: "page-type/component-property-group",
  slug: "page-component",
  propertySlug: "page-component",
  definition: "the component drawing a page of this page type on a screen of its own",
  createdAt: "2026-09-13T20:56:03.359Z",
  updatedAt: "2026-09-15T16:25:50.000Z",
} as const satisfies ComponentPropertyGroup
