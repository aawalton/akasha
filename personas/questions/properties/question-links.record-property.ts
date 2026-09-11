import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const questionLinks = {
  id: "01a06823-89b2-7009-9d8b-67cd69c12142",
  type: "record-property",
  slug: "question-links",
  propertySlug: "links",
  definition: "a way to open what a question is asking about",
  properties: [
    { pageProperty: "text-property/link-label", required: true, many: false },
    { pageProperty: "text-property/link-target", required: true, many: false },
    { pageProperty: "select-property/link-platform", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One thing to open is two links where the web and the app reach that thing apart.",
    },
    {
      invariantKind: "departure",
      statement: "A question has links only where Alan has to look at something to answer.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
