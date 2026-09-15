import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const lali = {
  id: "01a06594-c687-7002-832e-d75e4c54ae70",
  type: "book-section",
  slug: "lali",
  title: "Lali",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Lali — keeper of the delight of mathematics, on the Learn axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
