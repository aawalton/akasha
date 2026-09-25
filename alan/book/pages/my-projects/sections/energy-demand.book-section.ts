import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const energyDemand = {
  id: "01a06594-c68d-700b-856e-4bd453f6fd44",
  type: "page-type/book-section",
  slug: "energy-demand",
  title: "Annual Energy Demand (1350 Apple Ave, Provo, UT)",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Annual energy demand plan for all-electric 6000 sq ft Provo home with heat pumps, 12 gaming PCs, two EVs — sized against Provo Power net billing.",
  partOfCollections: ["book-section/my-projects/solar-power", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
