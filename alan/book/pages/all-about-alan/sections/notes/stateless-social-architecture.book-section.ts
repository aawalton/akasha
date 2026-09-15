import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const statelessSocialArchitecture = {
  id: "01a06594-c684-700e-a2fc-d3d79932483a",
  type: "book-section",
  slug: "stateless-social-architecture",
  title: "Stateless social architecture",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
