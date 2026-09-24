import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const siteDocumentWebApp = {
  id: "01a0d5a8-c966-7ff3-adf3-45f5c8bec4b3",
  type: "page-type/relation-property",
  slug: "site-document-web-app",
  propertySlug: "web-app",
  definition: "the web app showing a site document",
  targetPageType: "page-type/web-app",
  types: "ts",
} as const satisfies RelationProperty
