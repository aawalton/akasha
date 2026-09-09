import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const urgencyRemoval = {
  id: "01a06594-c685-700e-8919-1657b498c0fa",
  pageTypeSlug: "book-section",
  slug: "urgency-removal",
  title: "Urgency removal",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
