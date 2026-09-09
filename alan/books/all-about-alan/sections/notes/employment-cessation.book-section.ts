import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const employmentCessation = {
  id: "01a06594-c678-7002-8fe4-14db949ab0df",
  pageTypeSlug: "book-section",
  slug: "employment-cessation",
  title: "Employment cessation",
  sectionOf: "all-about-alan",
  description:
    "Employment cessation as a system — the 80% cost cut, the cost-vs-capacity ratchet that forced it, and the financial bridge that made the cut implementable.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
