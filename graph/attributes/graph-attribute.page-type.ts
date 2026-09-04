import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type GraphAttribute = Domain

export const graphAttribute = {
  id: "01a04fe8-cec0-78cc-85d5-3ca1e47761ce",
  pageTypeSlug: "page-type",
  slug: "graph-attribute",
  definition: "a fact carried on an edge",
  partSlugs: ["graph-attribute/known", "graph-attribute/property"],
  pluralSlug: "graph-attributes",
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
