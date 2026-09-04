import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const autismDiagnosticArc = {
  id: "01a06594-c675-7006-ae68-273efaa44170",
  pageTypeSlug: "book-chapter",
  slug: "autism-diagnostic-arc",
  title: "Diagnostic arc",
  description:
    'Autism diagnostic arc — late realization at 38, the prior "stress disorder" framing, the breaking event, and the catastrophic phase.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
