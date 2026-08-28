import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Slug } from "../page/slug.page-property-type.ts"

export type DomainParentSlug = Slug

export const domainParentSlug = {
  id: "01a049c8-3ead-7b61-b14a-db0e1f0f0c30",
  slug: "domain-parent-slug",
  definition: "the domain a domain sits inside",
  extendsSlug: "slug",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
