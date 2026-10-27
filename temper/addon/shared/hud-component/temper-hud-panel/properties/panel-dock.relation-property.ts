import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const panelDock = {
  id: "01a17ec6-0e98-7848-8b77-39fe4ae6b183",
  type: "page-type/relation-property",
  slug: "panel-dock",
  propertySlug: "dock",
  definition: "the dock a panel is placed against",
  targetPageType: "page-type/temper-hud-dock",
  types: "ts",
  createdAt: "2026-10-27T19:11:11.511Z",
  updatedAt: "2026-10-27T19:11:11.511Z",
} as const satisfies RelationProperty
