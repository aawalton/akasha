import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { DomainSlug } from "./domain-slug.page-property-type.ts"

export type PartSlugs = List<DomainSlug>

export const partSlugs = {
  id: "01a049cb-c488-7b90-ba0a-f6463fcda254",
  pageTypeSlug: "page-property-type",
  slug: "part-slugs",
  definition: "the domains this one is made of, in the order they are read",
  extendsSlug: "page-property-type/domain-slug",
  kind: "list",
  entrySlug: "domain-slug",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement: "A page's parent is this edge inverted.",
    },
  ],
} as const satisfies PagePropertyType
