import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const secondPassport = {
  id: "01a076ee-ecd6-776d-aa3a-59a3ad29206f",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "second-passport",
  title: "Second Passport",
  sectionOf: "my-projects",
  description:
    "Finding a second citizenship for the family. The sections beneath hold the routes by active income and by passive income, and country-by-country readings of citizenship and residency inside the EU and outside it, each a snapshot of the law as it was on the date that reading names.",
  partOfCollections: ["my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
