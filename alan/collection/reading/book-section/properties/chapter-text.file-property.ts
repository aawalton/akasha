import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const chapterText = {
  id: "01a0658d-fe50-7000-8c31-32dfa5d0bba8",
  type: "page-type/file-property",
  slug: "chapter-text",
  propertySlug: "chapter-text",
  definition: "a chapter's prose",
  extensions: ["md"],
  types: "ts",
} as const satisfies FileProperty
