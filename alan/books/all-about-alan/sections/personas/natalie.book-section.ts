import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const natalie = {
  id: "01a06594-c687-7004-b7df-c3383266f605",
  pageTypeSlug: "book-section",
  slug: "natalie",
  title: "Natalie",
  sectionOf: "all-about-alan",
  description:
    "Natalie — Alan's Food on the Health axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
