import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ChampionedDomain = Slug

export const championedDomain = {
  id: "01a0534a-80f9-742b-83f5-bdbe548d9b58",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "championed-domain",
  propertySlug: "championed-domain",
  definition: "the domain a persona champions",
  targetPageType: "page-type/domain",
} as const satisfies RelationProperty
