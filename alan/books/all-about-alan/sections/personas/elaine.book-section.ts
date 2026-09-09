import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const elaine = {
  id: "01a06594-c686-7010-b576-30ca86282260",
  pageTypeSlug: "book-section",
  slug: "elaine",
  title: "Elaine",
  sectionOf: "all-about-alan",
  description:
    "Elaine — Alan's Medicine on the Health axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
