import type { Slug } from "../../../pages-system/page/properties/slug.page-property-type.ts"
import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type InvariantGroupSlug = Slug

export const invariantGroupSlug = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  pageTypeSlug: "page-property-type",
  slug: "invariant-group-slug",
  definition: "a slug naming an invariant group",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-type/invariant-group",
} as const satisfies PagePropertyType
