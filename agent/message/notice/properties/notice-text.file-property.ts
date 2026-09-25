import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const noticeText = {
  id: "01a06861-e7cd-7340-b6d9-e2011e270d0f",
  type: "page-type/file-property",
  slug: "notice-text",
  propertySlug: "text",
  definition: "the words of a notice",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice's words sit in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wrapping is the author's convenience rather than part of the words.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
