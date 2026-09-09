import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const beingKnownSupply = {
  id: "01a06594-c675-7013-b608-11ac47f2fad5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "being-known-supply",
  title: "Being-known supply",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
