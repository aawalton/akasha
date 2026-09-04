import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type TrackingEntry = Page

export const trackingEntry = {
  id: "01a06827-ec0c-7c96-bc4a-ca5b59f6b38f",
  pageTypeSlug: "page-type",
  slug: "tracking-entry",
  definition: "one set of field values written down together",
  pluralSlug: "tracking-entries",
  extendsSlug: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry takes one of three shapes: an instant, a session or a date.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which shape an entry takes is the page type it is rather than a value the entry states.",
    },
    {
      invariantKind: "absence",
      statement: "No page is an entry of this type without standing as one of the three shapes.",
    },
  ],
} as const satisfies PageType
