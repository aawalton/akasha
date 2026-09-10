import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type NoticeWarrant = string

export const noticeWarrant = {
  id: "01a0686b-cea8-7a45-9b23-fd9c6d3a0417",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "notice-warrant",
  propertySlug: "warrant",
  definition: "which seat a notice goes to and what editing its words costs",
  maxLength: 600,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A notice states which seat that notice goes to rather than leaving that to its sender.",
    },
    {
      invariantKind: "departure",
      statement: "The cost of editing a notice's words sits on the notice.",
    },
  ],
} as const satisfies TextProperty
