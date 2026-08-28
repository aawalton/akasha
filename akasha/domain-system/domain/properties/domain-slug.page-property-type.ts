import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Slug } from "../../../pages-system/page/properties/slug.page-property-type.ts"

export type DomainSlug = Slug

export const domainSlug = {
  id: "01a04a08-fcf3-7003-9b33-ccbd3edd35cb",
  slug: "domain-slug",
  definition: "a slug naming a domain",
  extendsSlug: null,
  type: "relation",
  targetPageTypeSlug: "domain",
} as const satisfies PagePropertyType
