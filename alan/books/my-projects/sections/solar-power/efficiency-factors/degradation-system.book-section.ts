import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const degradationSystem = {
  id: "01a06594-c68c-700e-9b18-24b710ce2d62",
  pageTypeSlug: "book-section",
  slug: "degradation-system",
  title: "Degradation, ILR, Albedo, Structural, UV",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Module degradation, DC/AC ratio & clipping, albedo, snow load structural, and high-altitude UV. The factors that act over years or at the system-design level.",
  partOfCollections: ["book-section/solar-power/efficiency-factors"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
