import type { ComponentPropertyGroupStated } from "akasha/code/component-property-group/component-property-group.page-type.ts"
import type { ComponentPropertyGroup } from "akasha/code/component-property-group/component-property-group.page-type.types.ts"

export type PageComponent = ComponentPropertyGroupStated

export const pageComponent = {
  id: "01a09c8e-401f-754c-b5fb-775347404752",
  type: "component-property-group",
  slug: "page-component",
  propertySlug: "page-component",
  definition: "the component drawing a page of this page type on a screen of its own",
} as const satisfies ComponentPropertyGroup
