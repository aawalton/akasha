import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"

export type GraphAttribute = Domain

export const graphAttribute = {
  id: "01a04fe8-cec0-78cc-85d5-3ca1e47761ce",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "graph-attribute",
  definition: "a fact carried on an edge",
  parts: ["graph-attribute/known", "graph-attribute/property"],
  pluralSlug: "graph-attributes",
  extends: ["page-type/domain"],
} as const satisfies PageType
