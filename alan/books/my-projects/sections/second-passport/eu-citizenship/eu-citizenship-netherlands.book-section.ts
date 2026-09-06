import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipNetherlands = {
  id: "01a06594-c688-700e-9a57-8abfe6cce228",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-netherlands",
  title: "Netherlands",
  description:
    "All paths to Dutch citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (restricted), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
