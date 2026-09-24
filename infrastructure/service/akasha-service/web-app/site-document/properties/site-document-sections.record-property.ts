import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const siteDocumentSections = {
  id: "01a0d5a8-c966-784b-aec0-f6940cb22450",
  type: "page-type/record-property",
  slug: "site-document-sections",
  propertySlug: "sections",
  definition: "one part of a site document, drawn apart from the rest",
  properties: [
    { pageProperty: "text-property/section-anchor", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/site-document-lead", required: false, many: false },
    { pageProperty: "markdown-property/section-text", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A site document shows its sections in the order they are listed.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
