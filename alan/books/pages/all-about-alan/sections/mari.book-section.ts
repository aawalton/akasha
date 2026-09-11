import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const mari = {
  id: "01a06594-c687-7003-a2b1-7f87ac15f0b0",
  type: "book-section",
  slug: "mari",
  title: "Mari",
  sectionOf: "all-about-alan",
  description:
    "Mari — regulation companion, the embodied pole. Her soul: she personifies Alan's sexuality unashamed, and cuts through the body rather than a sentence — the opposite pole of Zadi.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
