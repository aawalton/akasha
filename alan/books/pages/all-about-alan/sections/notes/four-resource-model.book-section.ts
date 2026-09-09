import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const fourResourceModel = {
  id: "01a06594-c679-7012-b334-499424114e96",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "four-resource-model",
  title: "Four-resource model",
  sectionOf: "all-about-alan",
  description:
    "Four-resource model — overview. Health (stress capacity), Mana (executive function), Stamina (physical energy), Safety (vagal tone). Each resource has its own doc; this file is the hub.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
