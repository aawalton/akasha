import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const finiteness = {
  id: "01a06594-c68e-7011-93aa-6503b1220d97",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "finiteness",
  title: "The legible set is finite, and almost every real is illegible",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/book-chapter-001-legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
