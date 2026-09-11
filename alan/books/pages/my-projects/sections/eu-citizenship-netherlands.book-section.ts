import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const euCitizenshipNetherlands = {
  id: "01a06594-c688-700e-9a57-8abfe6cce228",
  type: "book-section",
  slug: "eu-citizenship-netherlands",
  title: "Netherlands",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Dutch citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (restricted), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
