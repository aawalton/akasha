import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const graphNode = {
  id: "01a04fe8-cebb-7a08-ad56-e698e175e03b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "graph-node",
  definition: "a thing the graph can name",
  parts: ["graph-node/file"],
  pluralSlug: "graph-nodes",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node is a path.",
    },
    {
      invariantKind: "departure",
      statement: "A page is a node with a page type rather than a node of its own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
