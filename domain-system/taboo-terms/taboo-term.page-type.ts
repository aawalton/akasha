import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { KeptSenses } from "./properties/kept-senses.text-property.ts"
import type { Pattern } from "./properties/pattern.text-property.ts"
import type { TabooSenses } from "./properties/taboo-senses.record-property.ts"

export type TabooTerm = Page & {
  pattern: Pattern
  tabooSenses: TabooSenses
  keptSenses?: KeptSenses
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
    "text-property/kept-senses",
    "text-property/pattern",
    "text-property/sense",
  ],
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "pattern", required: true, many: false },
    { pagePropertySlug: "taboo-senses", required: true, many: true, max: null },
    { pagePropertySlug: "kept-senses", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo term is keyed by the word the taboo term bars.",
    },
    {
      invariantKind: "departure",
      statement: "The word stands wherever the word carries a sense the term does not bar.",
    },
    {
      invariantKind: "departure",
      statement: "A term names the senses the term keeps as well as the senses the term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A term naming no kept sense permits every other sense by omission alone.",
    },
    {
      invariantKind: "departure",
      statement: "A sense a term bars was written here before the sense was barred.",
    },
    {
      invariantKind: "departure",
      statement: "A taboo term is found by its pattern rather than by its slug.",
    },
    {
      invariantKind: "absence",
      statement: "A taboo term states no warrant for what the taboo term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A change adding text a pattern finds is refused until that term has been read.",
    },
    {
      invariantKind: "departure",
      statement: "A term reaches inside a camelCase name.",
    },
  ],
} as const satisfies PageType
