import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const prayerGrounding = {
  id: "01a06594-c67c-7004-938a-ebebca09b6ec",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "prayer-grounding",
  title: "Prayer-grounding",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
