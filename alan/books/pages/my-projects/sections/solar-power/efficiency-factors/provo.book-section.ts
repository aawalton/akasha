import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const provo = {
  id: "01a06594-c68d-7001-bb47-b48d44e07fa5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "provo",
  title: "Provo-Specific Anchor Numbers",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Provo-specific anchor numbers — best-case specific yield, sensitivity ranges for roof orientation, and the inputs to plug into PVWatts.",
  partOfCollections: ["book-section/solar-power/efficiency-factors", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
