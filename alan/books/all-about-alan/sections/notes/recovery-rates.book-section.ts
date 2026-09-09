import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const recoveryRates = {
  id: "01a06594-c67c-700d-b45c-73bcd8c73a88",
  pageTypeSlug: "book-section",
  slug: "recovery-rates",
  title: "Recovery rates",
  sectionOf: "all-about-alan",
  description:
    "Stress-capacity recovery rates — deep meditative breathing, rest, sleep, hot baths, the Nuropod.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
