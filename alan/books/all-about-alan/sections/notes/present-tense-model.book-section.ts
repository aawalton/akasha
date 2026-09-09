import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const presentTenseModel = {
  id: "01a06594-c67c-7006-a146-7d12fa444c1a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "present-tense-model",
  title: "Present-tense conceptual model",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
