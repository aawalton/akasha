import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const recoveryRates = {
  id: "01a06594-c67c-700d-b45c-73bcd8c73a88",
  type: "book-section",
  slug: "recovery-rates",
  title: "Recovery rates",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Stress-capacity recovery rates — deep meditative breathing, rest, sleep, hot baths, the Nuropod.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
