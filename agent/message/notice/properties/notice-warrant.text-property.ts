import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const noticeWarrant = {
  id: "01a0686b-cea8-7a45-9b23-fd9c6d3a0417",
  type: "page-type/text-property",
  slug: "notice-warrant",
  propertySlug: "warrant",
  definition: "the seat a notice is sent to and the cost of a change to the notice's words",
  maxLength: 600,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice states which seat that notice goes to rather than leaving that to its sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cost of editing a notice's words sits on the notice.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
