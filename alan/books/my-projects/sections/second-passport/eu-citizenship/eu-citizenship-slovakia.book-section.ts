import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipSlovakia = {
  id: "01a06594-c689-7002-9cc3-776eb8fefa41",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-slovakia",
  title: "Slovak Citizenship Paths (May 2026)",
  sectionOf: "book-section/second-passport/eu-citizenship",
  description:
    "All paths to Slovak citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (constrained), and current backlogs per path.",
  partOfCollections: ["book-section/second-passport/eu-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
