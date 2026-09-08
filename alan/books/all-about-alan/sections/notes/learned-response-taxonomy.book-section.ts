import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const learnedResponseTaxonomy = {
  id: "01a06594-c67a-7017-8351-28082b9998bf",
  pageTypeSlug: "book-section",
  slug: "learned-response-taxonomy",
  title: "Learned-response taxonomy",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
