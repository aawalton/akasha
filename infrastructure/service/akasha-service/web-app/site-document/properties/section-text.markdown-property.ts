import type { MarkdownProperty } from "akasha/page/markdown-property/markdown-property.page-type.types.ts"

export const sectionText = {
  id: "01a0d5a8-c966-71b1-90e5-c376116efd14",
  type: "page-type/markdown-property",
  slug: "section-text",
  propertySlug: "text",
  definition: "what one section of a site document says",
  maxLength: 20000,
  nameFormat: null,
  types: "ts",
} as const satisfies MarkdownProperty
