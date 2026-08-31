import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Pattern } from "./properties/pattern.text-property.ts"
import type { TabooSenses } from "./properties/taboo-senses.record-property.ts"

export type TabooTerm = Page & {
  pattern: Pattern
  tabooSenses: TabooSenses
}

export const tabooTerm = {
  id: "01a0592c-2737-7057-aa66-a46141334052",
  pageTypeSlug: "page-type",
  slug: "taboo-term",
  definition: "a word this system never writes in the senses it bars",
  pluralSlug: "taboo-terms",
  partSlugs: [
    "record-property/taboo-senses",
    "text-property/instead",
    "text-property/pattern",
    "text-property/sense",
  ],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "pattern", required: true, many: false },
    { pagePropertySlug: "taboo-senses", required: true, many: true, max: null },
  ],
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
      invariantKind: "departure",
      statement: "A taboo term is found by its pattern rather than by its slug.",
    },
    {
      invariantKind: "absence",
      statement: "A taboo term states no warrant for what it bars.",
    },
    {
      invariantKind: "gap",
      statement: "A change adding text a pattern finds is refused until that term has been read.",
    },
  ],
} as const satisfies PageType
