import type { PageType } from "@akasha/pages/page-type"
import type { Instead } from "../../../taboo-terms/properties/instead.text-property.ts"
import type { Term } from "../term.page-type.ts"
import type { ReplacementPatterns } from "./properties/replacement-patterns.record-property.ts"

export type BannedTerm = Term & {
  instead: Instead
  replacementPatterns?: ReplacementPatterns
}

export const bannedTerm = {
  id: "01a081ea-d66b-7bae-bde1-753ebd310536",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "banned-term",
  definition: "one term akasha writes another term in place of",
  pluralSlug: "banned-terms",
  parts: [
    "text-property/instead",
    "text-property/from-pattern",
    "text-property/to-pattern",
    "record-property/replacement-patterns",
    "relation-property/prose-frame",
  ],
  extends: ["page-type/term"],
  properties: [
    { pageProperty: "text-property/instead", required: true, many: false },
    {
      pageProperty: "record-property/replacement-patterns",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
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
