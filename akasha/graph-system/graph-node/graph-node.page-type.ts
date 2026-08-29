import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type GraphNode = Domain

export const graphNode = {
  id: "01a04fe8-cebb-7a08-ad56-e698e175e03b",
  pageTypeSlug: "page-type",
  slug: "graph-node",
  definition: "a thing the graph can name",
  partSlugs: ["graph-node/file"],
  pluralSlug: "graph-nodes",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A node is a path, and a page is a node with a page type rather than a node of its own.",
    },
  ],
} as const satisfies PageType
