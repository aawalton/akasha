import type { BookSection } from "../../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyCzechia = {
  id: "01a06594-c689-700a-9aa5-66ceecb35bd6",
  pageTypeSlug: "book-section",
  slug: "eu-residency-czechia",
  title: "Czechia",
  description:
    "Czechia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/czechia.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
