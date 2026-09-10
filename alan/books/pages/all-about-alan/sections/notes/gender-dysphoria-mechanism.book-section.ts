import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const genderDysphoriaMechanism = {
  id: "01a06594-c679-7014-851a-4270d5ad97f3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "gender-dysphoria-mechanism",
  title: "Alan's model of gender",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
