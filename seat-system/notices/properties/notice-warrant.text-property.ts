import type { TextProperty } from "@akasha/pages-system/text-property"

export type NoticeWarrant = string

export const noticeWarrant = {
  id: "01a0686b-cea8-7a45-9b23-fd9c6d3a0417",
  pageTypeSlug: "text-property",
  slug: "notice-warrant",
  propertySlug: "warrant",
  definition: "which seat a notice goes to and what editing its words costs",
  max: 600,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notice states which seat it goes to rather than leaving that to its sender.",
    },
    {
      invariantKind: "departure",
      statement: "What editing a notice's words costs stands on the notice.",
    },
  ],
} as const satisfies TextProperty
