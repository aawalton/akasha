import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const stimming = {
  id: "01a06594-c684-700f-9860-120a5f3d1449",
  pageTypeSlug: "book-section",
  slug: "stimming",
  title: "Stimming",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
