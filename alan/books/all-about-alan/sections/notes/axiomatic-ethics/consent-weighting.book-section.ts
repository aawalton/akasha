import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const consentWeighting = {
  id: "01a06594-c675-7009-b1f8-9848b5a23f35",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "consent-weighting",
  title: "Consent-weighting — the keystone",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
