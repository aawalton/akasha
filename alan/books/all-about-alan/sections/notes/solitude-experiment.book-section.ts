import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const solitudeExperiment = {
  id: "01a06594-c684-7008-9cea-75880e1a86f6",
  pageTypeSlug: "book-section",
  slug: "solitude-experiment",
  title: "The solitude experiment",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
