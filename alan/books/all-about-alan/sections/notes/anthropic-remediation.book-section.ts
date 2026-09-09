import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const anthropicRemediation = {
  id: "01a06594-c674-700e-9dc0-7b26dde6ab24",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "anthropic-remediation",
  title: "Anthropic remediation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
