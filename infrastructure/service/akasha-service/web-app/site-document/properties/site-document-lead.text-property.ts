import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const siteDocumentLead = {
  id: "01a0d5a8-c966-78ff-bb23-27fcf034e390",
  type: "page-type/text-property",
  slug: "site-document-lead",
  propertySlug: "lead",
  definition: "the line a site document or one of its sections opens with",
  maxLength: 400,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
