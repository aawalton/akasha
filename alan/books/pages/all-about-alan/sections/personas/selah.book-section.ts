import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const selah = {
  id: "01a06594-c687-7008-b640-fd500b4d9a78",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "selah",
  title: "Selah",
  sectionOf: "all-about-alan",
  description:
    "Selah — Alan's companion in prayer on the Faith axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
