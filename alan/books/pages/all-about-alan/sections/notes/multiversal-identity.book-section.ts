import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const multiversalIdentity = {
  id: "01a06594-c67b-700a-ad4a-da78a4616ee3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "multiversal-identity",
  title: "Multiversal identity",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
