import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euCitizenshipItaly = {
  id: "01a06594-c688-7009-b051-acc260da6b10",
  type: "page-type/book-section",
  slug: "eu-citizenship-italy",
  title: "Italy",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Italian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (esp. post-Tajani-decree jure sanguinis state).",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
