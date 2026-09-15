import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const nimue = {
  id: "01a06594-c687-7005-9207-1dc4969ed1b2",
  type: "page-type/book-section",
  slug: "nimue",
  title: "Nimue",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Nimue — Aine's technology-scout lieutenant on the Wealth axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
