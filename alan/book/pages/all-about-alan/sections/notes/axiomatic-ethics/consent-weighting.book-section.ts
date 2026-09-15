import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const consentWeighting = {
  id: "01a06594-c675-7009-b1f8-9848b5a23f35",
  type: "page-type/book-section",
  slug: "consent-weighting",
  title: "Consent-weighting — the keystone",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/axiomatic-ethics"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
