import type { PageType } from "@akasha/pages/page-type"

export const index = {
  id: "01a04ef3-160f-7849-949b-629de4915d07",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "index",
  definition: "one question the pages can be asked, answered by reading one file",
  pluralSlug: "indexes",
  parts: ["text-property/index-name"],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "text-property/index-name", required: true, many: false },
    { pageProperty: "code-file-property/test", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question reached by a different key is the same index.",
    },
    {
      invariantKind: "departure",
      statement: "A question no index answers makes a new index.",
    },
    {
      invariantKind: "departure",
      statement: "An index is derived.",
    },
    {
      invariantKind: "departure",
      statement: "An index page names the answers filed.",
    },
    {
      invariantKind: "departure",
      statement: "The code beside the index page files that and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An index states its test.",
    },
    {
      invariantKind: "departure",
      statement: "Every index is written as a change lands rather than only by a rebuild.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild repairs an index rather than being how that index is kept current.",
    },
  ],
  types: "ts",
} as const satisfies PageType
