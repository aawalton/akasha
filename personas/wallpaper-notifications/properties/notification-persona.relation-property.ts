import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type NotificationPersona = Slug

export const notificationPersona = {
  id: "01a06d66-40f9-7210-8fcc-86ba1e3ac448",
  pageTypeSlug: "relation-property",
  slug: "notification-persona",
  propertySlug: "persona",
  definition: "the persona a word to Alan is about",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
