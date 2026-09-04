import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SessionSlug = Slug

export const sessionSlug = {
  id: "01a06580-66fd-7412-a20a-d678614e0121",
  pageTypeSlug: "relation-property",
  slug: "session-slug",
  propertySlug: "session-slug",
  definition: "the session the set was logged in",
  targetPageTypeSlug: "page-type/workout-session",
} as const satisfies RelationProperty
