import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const icon = {
  id: "01a05fac-7584-7877-a778-efd8ee361ce1",
  type: "page-type/text-property",
  slug: "icon",
  propertySlug: "icon",
  definition: "the picture a page is known by at a glance",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "icon" },
    { partOfSpeech: "part-of-speech/noun", spelling: "icons" },
  ],
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no icon is drawn with the icon its page type names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming no icon takes the icon the page type it extends names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property is drawn with the icon of the page type the property is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon drawn in a list of properties is named as lucide names it.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:12:12.932Z",
  updatedAt: "2026-10-30T16:10:55.249Z",
} as const satisfies TextProperty
