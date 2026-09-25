import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipPortugal = {
  id: "01a06594-c689-7000-9317-71323ba3e69c",
  type: "page-type/book-section",
  slug: "eu-citizenship-portugal",
  title: "Portuguese Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Portuguese citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (post-Sephardic-closure, post-2025-reform).",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
