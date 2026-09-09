import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const nonDiscretionaryReclassification = {
  id: "01a06594-c67b-700f-b148-53cff72cd9e1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "non-discretionary-reclassification",
  title: "Non-discretionary reclassification",
  sectionOf: "all-about-alan",
  description:
    'Non-discretionary reclassification — the framing layer above the cost-vs-capacity calculation. Items mentally classified "must-do" never reach the math; reclassifying them is the first move.',
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
