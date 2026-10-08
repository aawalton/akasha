import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipSlovenia = {
  id: "01a06594-c689-7003-9753-71ae1c26ea0b",
  type: "page-type/book-section",
  slug: "eu-citizenship-slovenia",
  title: "Slovenia — Paths to Citizenship (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Slovenian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (restricted), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.105Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
