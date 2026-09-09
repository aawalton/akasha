import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const adhdAsNeurotype = {
  id: "01a06594-c674-7007-b64f-8ce57de16121",
  pageTypeSlug: "book-section",
  slug: "adhd-as-neurotype",
  title: "ADHD as neurotype (working definition)",
  sectionOf: "all-about-alan",
  description: "ADHD as a neurotype — Alan's working definition in his own terms.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
