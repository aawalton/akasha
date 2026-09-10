import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const selfQuieting = {
  id: "01a06594-c683-7008-8bd2-33b06d9a3284",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-quieting",
  title: "Self-quieting",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
