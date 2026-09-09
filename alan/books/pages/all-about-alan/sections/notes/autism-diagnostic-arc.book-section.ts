import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const autismDiagnosticArc = {
  id: "01a06594-c675-7006-ae68-273efaa44170",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "autism-diagnostic-arc",
  title: "Diagnostic arc",
  sectionOf: "all-about-alan",
  description:
    'Autism diagnostic arc — late realization at 38, the prior "stress disorder" framing, the breaking event, and the catastrophic phase.',
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
