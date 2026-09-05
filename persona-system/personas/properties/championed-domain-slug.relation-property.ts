import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ChampionedDomainSlug = Slug

export const championedDomainSlug = {
  id: "01a0534a-80f9-742b-83f5-bdbe548d9b58",
  pageTypeSlug: "relation-property",
  slug: "championed-domain-slug",
  propertySlug: "championed-domain-slug",
  definition: "the domain a persona champions",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies RelationProperty
