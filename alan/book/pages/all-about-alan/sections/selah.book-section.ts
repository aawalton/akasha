import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const selah = {
  id: "01a06594-c687-7008-b640-fd500b4d9a78",
  type: "page-type/book-section",
  slug: "selah",
  title: "Selah",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Selah — Alan's companion in prayer on the Faith axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
