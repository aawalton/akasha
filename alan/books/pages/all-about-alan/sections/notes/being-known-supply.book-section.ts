import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const beingKnownSupply = {
  id: "01a06594-c675-7013-b608-11ac47f2fad5",
  type: "book-section",
  slug: "being-known-supply",
  title: "Being-known supply",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
