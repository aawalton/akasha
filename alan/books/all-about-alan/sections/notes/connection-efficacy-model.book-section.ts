import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const connectionEfficacyModel = {
  id: "01a06594-c677-7002-9077-3aa8340269c0",
  pageTypeSlug: "book-section",
  slug: "connection-efficacy-model",
  title: "Connection efficacy model",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
