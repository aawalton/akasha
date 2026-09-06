import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipLatvia = {
  id: "01a06594-c688-700a-8546-65cb25dc7feb",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-latvia",
  title: "Latvian Citizenship Paths (May 2026)",
  description:
    "All paths to Latvian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["eu-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
