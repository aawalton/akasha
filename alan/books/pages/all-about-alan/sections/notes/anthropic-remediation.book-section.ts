import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const anthropicRemediation = {
  id: "01a06594-c674-700e-9dc0-7b26dde6ab24",
  type: "book-section",
  slug: "anthropic-remediation",
  title: "Anthropic remediation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
