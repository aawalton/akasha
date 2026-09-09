import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenship = {
  id: "01a076f8-b6f5-77fc-a7e0-752644804e81",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-citizenship",
  title: "EU Citizenship",
  sectionOf: "book-section/my-projects/second-passport",
  description:
    "The routes to citizenship of a European Union member country, one section for each country and a summary reading across them all. Each country section says what the routes ask for, how long each route runs, whether the country permits a second citizenship, and where the backlog sits.",
  partOfCollections: ["book-section/my-projects/second-passport"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
