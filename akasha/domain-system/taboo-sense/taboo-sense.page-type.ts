import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Instead } from "./properties/instead.text-property.ts"
import type { Sense } from "./properties/sense.text-property.ts"

export type TabooSense = Page & {
  sense: Sense
  instead: Instead
}

export const tabooSense = {
  id: "01a0592c-2737-7057-aa66-a46141334052",
  pageTypeSlug: "page-type",
  slug: "taboo-sense",
  definition: "a word this system never writes in one of its senses",
  pluralSlug: "taboo-senses",
  partSlugs: ["text-property/instead", "text-property/sense"],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "sense", required: true, many: false },
    { pagePropertySlug: "instead", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo sense bars one sense of a word.",
    },
    {
      invariantKind: "departure",
      statement: "The word stands wherever it carries another sense.",
    },
    {
      invariantKind: "departure",
      statement: "A word carries at most one taboo sense.",
    },
    {
      invariantKind: "departure",
      statement: "A taboo sense is keyed by the word it bars.",
    },
    {
      invariantKind: "departure",
      statement: "The sense a word is barred in was written here before it was barred.",
    },
    {
      invariantKind: "absence",
      statement: "A taboo sense states no warrant for its bar.",
    },
  ],
} as const satisfies PageType
