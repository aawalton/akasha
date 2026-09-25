import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const provo = {
  id: "01a06594-c68d-7001-bb47-b48d44e07fa5",
  type: "page-type/book-section",
  slug: "provo",
  title: "Provo-Specific Anchor Numbers",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Provo-specific anchor numbers — best-case specific yield, sensitivity ranges for roof orientation, and the inputs to plug into PVWatts.",
  partOfCollections: ["book-section/solar-power/efficiency-factors", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
