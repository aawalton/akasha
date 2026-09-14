import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const employmentCessation = {
  id: "01a06594-c678-7002-8fe4-14db949ab0df",
  type: "book-section",
  slug: "employment-cessation",
  title: "Employment cessation",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Employment cessation as a system — the 80% cost cut, the cost-vs-capacity ratchet that forced it, and the financial bridge that made the cut implementable.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
