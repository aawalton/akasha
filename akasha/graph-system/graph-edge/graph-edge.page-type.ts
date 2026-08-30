import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { AttributeSlugs } from "./properties/attribute-slugs.relation-property.ts"
import type { IndexSlug } from "./properties/index-slug.relation-property.ts"

export type GraphEdge = Domain & {
  indexSlug?: IndexSlug
  attributeSlugs?: AttributeSlugs
}

export const graphEdge = {
  id: "01a04fe8-cebd-71d5-a040-d50b202e6eb1",
  pageTypeSlug: "page-type",
  slug: "graph-edge",
  definition: "a way one thing reaches another",
  pluralSlug: "graph-edges",
  partSlugs: [
    "graph-edge/import-edge",
    "graph-edge/relation",
    "relation-property/index-slug",
    "relation-property/attribute-slugs",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "index-slug", required: false, many: false },
    { pagePropertySlug: "attribute-slugs", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An edge kind names the index that answers it or the graph derives it here or both.",
    },
    {
      invariantKind: "departure",
      statement: "One doing both says on each edge which it was.",
    },
    {
      invariantKind: "departure",
      statement: "An edge kind names the attributes it carries.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute names no edge.",
    },
  ],
} as const satisfies PageType
