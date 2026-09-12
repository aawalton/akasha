import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const noticeText = {
  id: "01a06861-e7cd-7340-b6d9-e2011e270d0f",
  type: "file-property",
  slug: "notice-text",
  propertySlug: "text",
  definition: "the words a notice hands to the seat the notice reaches",
  extensions: ["md"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notice's words sit in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Wrapping is the author's convenience rather than part of the words.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
