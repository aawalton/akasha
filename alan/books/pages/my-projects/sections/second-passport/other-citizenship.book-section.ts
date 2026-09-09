import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherCitizenship = {
  id: "01a076f8-b6f6-7a13-8799-9f81299d3caf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship",
  title: "Citizenship Outside the EU",
  sectionOf: "book-section/my-projects/second-passport",
  description:
    "The routes to citizenship of a country outside the European Union, one section for each country and a summary reading across them all. The set covers the countries that reach the same quality of life without the union's freedom of movement.",
  partOfCollections: ["book-section/my-projects/second-passport"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
