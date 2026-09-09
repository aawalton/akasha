import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const energyDemand = {
  id: "01a06594-c68d-700b-856e-4bd453f6fd44",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "energy-demand",
  title: "Annual Energy Demand (1350 Apple Ave, Provo, UT)",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Annual energy demand plan for all-electric 6000 sq ft Provo home with heat pumps, 12 gaming PCs, two EVs — sized for self-sufficiency.",
  partOfCollections: ["book-section/my-projects/solar-power"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
