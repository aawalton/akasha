import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const softwareAndSaas = {
  id: "01a06594-c684-7007-a95e-c7f7465962a8",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "software-and-saas",
  title: "Software and SaaS",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
