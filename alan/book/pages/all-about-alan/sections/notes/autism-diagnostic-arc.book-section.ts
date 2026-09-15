import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const autismDiagnosticArc = {
  id: "01a06594-c675-7006-ae68-273efaa44170",
  type: "book-section",
  slug: "autism-diagnostic-arc",
  title: "Diagnostic arc",
  sectionOf: "alan-book/all-about-alan",
  description:
    'Autism diagnostic arc — late realization at 38, the prior "stress disorder" framing, the breaking event, and the catastrophic phase.',
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
