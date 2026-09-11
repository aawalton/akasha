import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const stressResponses = {
  id: "01a06594-c684-7013-8dcd-56f4febef04b",
  type: "book-section",
  slug: "stress-responses",
  title: "Stress responses",
  sectionOf: "all-about-alan",
  description:
    "Stress responses — meltdown and shutdown as symptom labels, the five sympathetic/parasympathetic modes (fight, flight, freeze, fawn, flop) as causes, and integration with the safety scale.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
