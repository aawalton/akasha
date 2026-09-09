import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const nonHabituation = {
  id: "01a06594-c67b-7010-9732-c0d900bf1927",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "non-habituation",
  title: "Mechanism root: non-habituation",
  sectionOf: "all-about-alan",
  description:
    "Non-habituation — autism mechanism root; sensory habituation that doesn't happen, and the costs that follow.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
