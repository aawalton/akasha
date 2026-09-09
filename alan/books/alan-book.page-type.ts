import type { PageType } from "@akasha/pages/page-type"

export const alanBook = {
  id: "01a06d23-26a9-7d50-bca7-7aa5849e1c17",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "alan-book",
  definition: "one book Alan writes",
  pluralSlug: "alan-books",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book Alan is writing is read by nobody else while Alan writes that book.",
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
  types: "ts",
} as const satisfies PageType
