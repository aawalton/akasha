import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const adhdAsNeurotype = {
  id: "01a06594-c674-7007-b64f-8ce57de16121",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "adhd-as-neurotype",
  title: "ADHD as neurotype (working definition)",
  sectionOf: "all-about-alan",
  description: "ADHD as a neurotype — Alan's working definition in his own terms.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
