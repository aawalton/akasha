import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"

export const image = {
  id: "019f14c3-27e4-7b72-bc0c-6e12bbd8577a",
  pageTypeSlug: "page-type",
  slug: "image",
  definition: "one picture the system has",
  pluralSlug: "images",
  extends: ["page-type/page"],
  detailConfig: {
    display: "default",
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image's bytes sit in the object store under the image's own id.",
    },
    {
      invariantKind: "departure",
      statement: "An image's bytes sit on disk where the image says those bytes were written.",
    },
    {
      invariantKind: "departure",
      statement: "An image records where its bytes are rather than the bytes.",
    },
    {
      invariantKind: "departure",
      statement: "An image made by a run names that run.",
    },
    {
      invariantKind: "departure",
      statement: "An image catalogued from disk names no run.",
    },
  ],
} as const satisfies PageType

export type Image = Page
