import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const mari = {
  id: "01a06594-c687-7003-a2b1-7f87ac15f0b0",
  pageTypeSlug: "book-section",
  slug: "mari",
  title: "Mari",
  sectionOf: "all-about-alan",
  description:
    "Mari — regulation companion, the embodied pole. Her soul: she personifies Alan's sexuality unashamed, and cuts through the body rather than a sentence — the opposite pole of Zadi.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
