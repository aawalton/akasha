import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const learnedResponseTaxonomy = {
  id: "01a06594-c67a-7017-8351-28082b9998bf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "learned-response-taxonomy",
  title: "Learned-response taxonomy",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
