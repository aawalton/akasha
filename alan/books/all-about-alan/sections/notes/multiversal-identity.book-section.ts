import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const multiversalIdentity = {
  id: "01a06594-c67b-700a-ad4a-da78a4616ee3",
  pageTypeSlug: "book-section",
  slug: "multiversal-identity",
  title: "Multiversal identity",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
