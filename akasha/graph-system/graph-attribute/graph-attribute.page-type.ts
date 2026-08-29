import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type GraphAttribute = Domain

export const graphAttribute = {
  id: "01a04fe8-cec0-78cc-85d5-3ca1e47761ce",
  pageTypeSlug: "page-type",
  slug: "graph-attribute",
  definition: "a fact carried on an edge",
  partSlugs: ["graph-attribute/property"],
  pluralSlug: "graph-attributes",
  extendsSlug: "page-type/domain",
} as const satisfies PageType
