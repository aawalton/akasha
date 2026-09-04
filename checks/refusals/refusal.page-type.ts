import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { RefusalText } from "./properties/refusal-text.text-property.ts"

export type Refusal = Page & {
  title: Title
  text: RefusalText
}

export const refusal = {
  id: "01a0699d-4000-7a11-9c02-3f61b0d24e77",
  pageTypeSlug: "page-type",
  slug: "refusal",
  definition: "the words printed when an instrument refuses",
  pluralSlug: "refusals",
  extendsSlug: ["page-type/page"],
  mortal: true,
  partSlugs: ["text-property/refusal-text"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "refusal-text", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is words to print and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal goes when the instrument printing that refusal goes.",
    },
    {
      invariantKind: "departure",
      statement: "A hole marked in the text is filled by whoever prints the refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "The holes a refusal marks are read off the refusal's own text rather than listed beside that text.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal is printed at more than one place.",
    },
  ],
} as const satisfies PageType
