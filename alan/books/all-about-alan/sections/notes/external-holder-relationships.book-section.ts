import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const externalHolderRelationships = {
  id: "01a06594-c679-7006-ad41-fb5163e34da9",
  pageTypeSlug: "book-section",
  slug: "external-holder-relationships",
  title: "Relationships held from the outside",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
