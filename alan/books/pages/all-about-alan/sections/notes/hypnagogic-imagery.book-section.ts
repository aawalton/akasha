import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const hypnagogicImagery = {
  id: "01a06594-c67a-700a-8fae-215c80f0ee28",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "hypnagogic-imagery",
  title: "Hypnagogic imagery",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
