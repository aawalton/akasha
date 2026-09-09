import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const meditativeBreathing = {
  id: "01a06594-c67b-7006-8f63-4738ae90c27e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "meditative-breathing",
  title: "Meditative breathing",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
