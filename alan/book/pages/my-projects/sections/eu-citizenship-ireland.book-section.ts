import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipIreland = {
  id: "01a06594-c688-7008-8f40-d97ab048fdbc",
  type: "page-type/book-section",
  slug: "eu-citizenship-ireland",
  title: "Ireland — Paths to Citizenship (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Irish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
