import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { DomainSlug } from "./domain-slug.page-property-type.ts"
import type { List } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type PartSlugs = List<DomainSlug>

export const partSlugs = {
  id: "01a049cb-c488-7b90-ba0a-f6463fcda254",
  slug: "part-slugs",
  definition: "the domains this one is made of, in the order they are read",
  extendsSlug: null,
  type: "list",
  ofSlug: "domain-slug",
  max: null,
} as const satisfies PagePropertyType
