import type { BookSection } from "../book-section.page-type.ts"

export const bookChapter002Crito = {
  id: "01a06594-c68f-700d-8e65-ec3f0fb13f41",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "book-chapter-002-crito",
  title: "Crito",
  sectionOf: "plato-apology-crito",
  status: "completed",
  ownLength: 5341,
  position: 2,
  partOfCollections: ["plato-apology-crito"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
