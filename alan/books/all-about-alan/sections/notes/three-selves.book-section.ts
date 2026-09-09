import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const threeSelves = {
  id: "01a06594-c685-7005-ac68-60f81e408004",
  pageTypeSlug: "book-section",
  slug: "three-selves",
  title: "The three selves",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
