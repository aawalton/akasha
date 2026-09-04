import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export const image = {
  id: "019f14c3-27e4-7b72-bc0c-6e12bbd8577a",
  pageTypeSlug: "page-type",
  slug: "image",
  definition: "one picture the system holds",
  pluralSlug: "images",
  extendsSlug: "page-type/page",
  detailConfig: {
    display: "default",
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An image's bytes stand in the object store under the image's own id, and on disk where the image says they were written.",
    },
    {
      invariantKind: "departure",
      statement: "An image records where its bytes stand, never the bytes.",
    },
    {
      invariantKind: "departure",
      statement: "An image made by a run names that run; one catalogued from disk names none.",
    },
  ],
} as const satisfies PageType

export type Image = Page
