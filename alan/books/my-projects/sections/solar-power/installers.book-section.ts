import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const installers = {
  id: "01a06594-c68d-7018-8870-40c4dc8d0806",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "installers",
  title: "Rooftop Solar Installers Serving Provo, UT",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Comprehensive list of rooftop solar installers serving Provo, UT (1350 Apple Ave) with credentials, ratings, warranties, and red flags.",
  partOfCollections: ["book-section/my-projects/solar-power"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
