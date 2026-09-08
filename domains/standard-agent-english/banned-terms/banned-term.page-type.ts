import type { PageType } from "@akasha/pages/page-type"
import type { Instead } from "../../taboo-terms/properties/instead.text-property.ts"
import type { Term } from "../terms/term.page-type.ts"

export type BannedTerm = Term & {
  instead: Instead
}

export const bannedTerm = {
  id: "01a081ea-d66b-7bae-bde1-753ebd310536",
  pageTypeSlug: "page-type",
  slug: "banned-term",
  definition: "one term akasha writes another term in place of",
  pluralSlug: "banned-terms",
  partSlugs: ["text-property/instead"],
  extendsSlug: ["page-type/term"],
  properties: [{ pagePropertySlug: "text-property/instead", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A banned term names the term akasha writes in its place.",
    },
    {
      invariantKind: "departure",
      statement: "One word banned in two senses is two pages.",
    },
    {
      invariantKind: "departure",
      statement: "A sense this page does not name is a sense akasha still writes.",
    },
  ],
} as const satisfies PageType
