import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipBulgaria = {
  id: "01a06594-c687-7010-acf1-de91191ba7d4",
  type: "page-type/book-section",
  slug: "eu-citizenship-bulgaria",
  title: "Bulgarian Citizenship Paths",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Bulgarian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
