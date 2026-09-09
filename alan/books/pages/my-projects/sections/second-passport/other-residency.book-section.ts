import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherResidency = {
  id: "01a076f8-b6f7-747e-b0d7-9c4bf644a4b9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency",
  title: "Residency Outside the EU",
  sectionOf: "book-section/my-projects/second-passport",
  description:
    "The routes to residency in a country outside the European Union, one section for each country and a summary reading across them all. Australia carries a folder of its own, its visa streams being numerous enough to want a section each.",
  partOfCollections: ["book-section/my-projects/second-passport"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
