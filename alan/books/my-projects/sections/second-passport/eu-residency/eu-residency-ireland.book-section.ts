import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyIreland = {
  id: "01a06594-c689-7012-be4d-9ee463a89008",
  pageTypeSlug: "book-section",
  slug: "eu-residency-ireland",
  title: "Ireland",
  description:
    "Ireland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/ireland.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
