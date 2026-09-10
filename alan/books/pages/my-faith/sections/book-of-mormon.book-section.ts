import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const bookOfMormon = {
  id: "01a08861-b0d8-723b-af13-52fb08aaa872",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "book-of-mormon",
  title: "The Book of Mormon",
  sectionOf: "book-section/my-faith/sources",
  partOfCollections: ["book-section/my-faith/sources", "my-faith"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
