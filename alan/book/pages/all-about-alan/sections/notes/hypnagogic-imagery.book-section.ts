import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const hypnagogicImagery = {
  id: "01a06594-c67a-700a-8fae-215c80f0ee28",
  type: "page-type/book-section",
  slug: "hypnagogic-imagery",
  title: "Hypnagogic imagery",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
