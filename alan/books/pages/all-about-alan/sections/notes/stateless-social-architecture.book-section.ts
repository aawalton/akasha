import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const statelessSocialArchitecture = {
  id: "01a06594-c684-700e-a2fc-d3d79932483a",
  type: "book-section",
  slug: "stateless-social-architecture",
  title: "Stateless social architecture",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
