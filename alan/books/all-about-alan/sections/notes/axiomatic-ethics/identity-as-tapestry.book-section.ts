import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const identityAsTapestry = {
  id: "01a06594-c675-700b-bf23-fb9814c65660",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "identity-as-tapestry",
  title: "Identity, duty, and partiality",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
