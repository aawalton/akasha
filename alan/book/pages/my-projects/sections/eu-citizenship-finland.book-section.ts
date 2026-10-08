import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipFinland = {
  id: "01a06594-c688-7003-a8e9-6614da35a78c",
  type: "page-type/book-section",
  slug: "eu-citizenship-finland",
  title: "Finland",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Finnish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.104Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
