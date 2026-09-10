import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euResidency = {
  id: "01a076f8-b6f6-74a6-ac90-31993b41c2d9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency",
  title: "EU Residency",
  sectionOf: "book-section/my-projects/second-passport",
  description:
    "The routes to residency in a European Union member country, one section for each country and a summary reading across them all. Residency is the step most citizenship routes are counted from, so the clock a country runs on begins here rather than at the citizenship section.",
  partOfCollections: ["book-section/my-projects/second-passport", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
