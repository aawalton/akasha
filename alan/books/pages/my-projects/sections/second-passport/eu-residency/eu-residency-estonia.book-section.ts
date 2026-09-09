import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyEstonia = {
  id: "01a06594-c689-700c-9ac8-15910e3fc504",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-estonia",
  title: "Estonia",
  sectionOf: "book-section/second-passport/eu-residency",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
