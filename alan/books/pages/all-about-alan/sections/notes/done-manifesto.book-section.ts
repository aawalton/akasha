import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const doneManifesto = {
  id: "01a06594-c677-7012-9799-c272cd22068e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "done-manifesto",
  title: "The Done Manifesto",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
