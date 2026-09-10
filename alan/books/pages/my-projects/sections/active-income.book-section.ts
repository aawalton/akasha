import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const activeIncome = {
  id: "01a06594-c687-700d-ba67-d9f7ce885710",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "active-income",
  title: "Active Income",
  sectionOf: "book-section/my-projects/second-passport",
  partOfCollections: ["book-section/my-projects/second-passport", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
