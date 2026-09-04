import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"

export type AlanBook = Collection & {
  title: Title
}

export const alanBook = {
  id: "01a06d23-26a9-7d50-bca7-7aa5849e1c17",
  pageTypeSlug: "page-type",
  slug: "alan-book",
  definition: "one book Alan writes",
  pluralSlug: "alan-books",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book Alan is writing is read by nobody else while he writes it.",
    },
    {
      invariantKind: "absence",
      statement: "A book Alan writes states nothing a publisher assigns.",
    },
    {
      invariantKind: "departure",
      statement: "A book Alan writes is a collection of the chapters beneath that book.",
    },
  ],
} as const satisfies PageType
