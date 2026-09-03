import type { FileProperty } from "@akasha/pages-system/file-property"

export type NoticeText = "md"

export const noticeText = {
  id: "01a06861-e7cd-7340-b6d9-e2011e270d0f",
  pageTypeSlug: "file-property",
  slug: "notice-text",
  propertySlug: "text",
  definition: "the words a notice hands to the seat the notice reaches",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notice's words stand in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Wrapping is the author's convenience rather than part of the words.",
    },
  ],
} as const satisfies FileProperty
