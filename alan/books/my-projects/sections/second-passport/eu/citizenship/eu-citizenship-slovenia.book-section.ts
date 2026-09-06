import type { BookSection } from "../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipSlovenia = {
  id: "01a06594-c689-7003-9753-71ae1c26ea0b",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-slovenia",
  title: "Slovenia — Paths to Citizenship (May 2026)",
  description:
    "All paths to Slovenian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (restricted), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
