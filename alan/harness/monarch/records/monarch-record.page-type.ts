import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const monarchRecord = {
  id: "01a0680a-1a00-7001-b8f4-2c9e5a7b1102",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "monarch-record",
  definition: "one thing Monarch keeps about the household's money",
  pluralSlug: "monarch-records",
  extends: ["page-type/page"],
  parts: ["text-property/monarch-id"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/monarch-id", required: false, many: false },
    {
      pageProperty: "standard-agent-english-property/definition",
      required: false,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A record is the household's copy of the record Monarch holds rather than the original.",
    },
    {
      invariantKind: "departure",
      statement: "A record Monarch renames keeps its slug and takes the new title.",
    },
    {
      invariantKind: "departure",
      statement: "A daily sync rewrites a record's figures and no instruction names the figures.",
    },
    {
      invariantKind: "departure",
      statement: "A title is written as Monarch writes the title.",
    },
  ],
  types: "ts",
} as const satisfies PageType
