import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const degradationSystem = {
  id: "01a06594-c68c-700e-9b18-24b710ce2d62",
  type: "page-type/book-section",
  slug: "degradation-system",
  title: "Degradation, ILR, Albedo, Structural, UV",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Module degradation, DC/AC ratio & clipping, albedo, snow load structural, and high-altitude UV. The factors that act over years or at the system-design level.",
  partOfCollections: ["book-section/solar-power/efficiency-factors", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.108Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
