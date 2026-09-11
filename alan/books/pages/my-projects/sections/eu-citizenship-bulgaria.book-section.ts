import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const euCitizenshipBulgaria = {
  id: "01a06594-c687-7010-acf1-de91191ba7d4",
  type: "book-section",
  slug: "eu-citizenship-bulgaria",
  title: "Bulgarian Citizenship Paths",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Bulgarian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
