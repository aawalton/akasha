import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const loveConstruction = {
  id: "01a06594-c67b-7000-ad2b-10fe1c316be7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "love-construction",
  title: "Love construction",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
