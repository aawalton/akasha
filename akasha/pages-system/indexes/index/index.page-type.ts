import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../page-type/page-type.page-type.ts"
import type { IndexName } from "./properties/index-name.text-property.ts"

export type Index = Domain & {
  indexName: IndexName
}

export const index = {
  id: "01a04ef3-160f-7849-949b-629de4915d07",
  pageTypeSlug: "page-type",
  slug: "index",
  definition: "one question the corpus can be asked, answered by reading one file",
  partSlugs: ["text-property/index-name"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "index-name", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A question reached by a different key is the same index; only a question no index answers is a new one.",
    },
    {
      invariantKind: "departure",
      statement: "An index is derived, so it states no fact the pages do not already carry.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index page says what is filed and how it is found, and the modules say how it is written.",
    },
  ],
} as const satisfies PageType
