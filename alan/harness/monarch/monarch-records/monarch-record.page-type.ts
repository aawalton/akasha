import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../../../../domain-system/domains/properties/definition.text-property.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { MonarchId } from "./properties/monarch-id.text-property.ts"

export type MonarchRecord = Page & {
  title: Title
  monarchId?: MonarchId
  definition?: Definition
}

export const monarchRecord = {
  id: "01a0680a-1a00-7001-b8f4-2c9e5a7b1102",
  pageTypeSlug: "page-type",
  slug: "monarch-record",
  definition: "one thing Monarch keeps about the household's money",
  pluralSlug: "monarch-records",
  extendsSlug: "page-type/page",
  partSlugs: ["text-property/monarch-id"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "monarch-id", required: false, many: false },
    { pagePropertySlug: "definition", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record is the household's copy of what Monarch holds rather than the original.",
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
} as const satisfies PageType
