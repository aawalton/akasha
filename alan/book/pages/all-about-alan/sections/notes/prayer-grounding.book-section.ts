import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const prayerGrounding = {
  id: "01a06594-c67c-7004-938a-ebebca09b6ec",
  type: "book-section",
  slug: "prayer-grounding",
  title: "Prayer-grounding",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
