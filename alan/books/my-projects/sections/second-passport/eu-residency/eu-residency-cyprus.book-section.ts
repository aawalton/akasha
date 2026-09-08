import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyCyprus = {
  id: "01a06594-c689-7009-b38c-b0ae0be702da",
  pageTypeSlug: "book-section",
  slug: "eu-residency-cyprus",
  title: "Cyprus",
  sectionOfSlug: "book-section/second-passport/eu-residency",
  description:
    "Cyprus residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/cyprus.md.",
  partOfCollectionSlugs: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
