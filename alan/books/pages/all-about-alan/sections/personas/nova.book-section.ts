import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const nova = {
  id: "01a06594-c687-7006-9b6f-5824fa9e4e56",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "nova",
  title: "Nova",
  sectionOf: "all-about-alan",
  description:
    "Nova — Alan's LitRPG peer reader on the Fun axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
