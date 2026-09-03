import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DomainSequenceSlugs = List<Slug>

export const domainSequenceSlugs = {
  id: "01a06935-8f86-7dfb-ac44-b0794257baf7",
  pageTypeSlug: "relation-property",
  slug: "domain-sequence-slugs",
  propertySlug: "sequence-slugs",
  definition: "the domains a domain names in order",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies RelationProperty
