import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { TabooSenses } from "./properties/taboo-senses.record-property.ts"

export type TabooTerm = Page & {
  tabooSenses: TabooSenses
}

export const tabooTerm = {
  id: "01a0592c-2737-7057-aa66-a46141334052",
  pageTypeSlug: "page-type",
  slug: "taboo-term",
  definition: "a word this system never writes in the senses it bars",
  pluralSlug: "taboo-terms",
  partSlugs: ["record-property/taboo-senses", "text-property/instead", "text-property/sense"],
  extendsSlug: "page-type/page",
  properties: [{ pagePropertySlug: "taboo-senses", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo term is keyed by the word it bars.",
    },
    {
      invariantKind: "departure",
      statement: "The word stands wherever it carries a sense the term does not bar.",
    },
    {
      invariantKind: "departure",
      statement: "A sense a term bars was written here before it was barred.",
    },
    {
      invariantKind: "absence",
      statement: "A taboo term states no warrant for what it bars.",
    },
  ],
} as const satisfies PageType
