import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type NotificationPersonaSlug = Slug

export const notificationPersonaSlug = {
  id: "01a06d66-40f9-7210-8fcc-86ba1e3ac448",
  pageTypeSlug: "relation-property",
  slug: "notification-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona a word to Alan is about",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
