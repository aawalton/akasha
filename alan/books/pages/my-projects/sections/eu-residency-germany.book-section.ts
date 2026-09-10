import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const euResidencyGermany = {
  id: "01a06594-c689-700f-975d-7babb200bcc2",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-germany",
  title: "Germany",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Germany residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/germany.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
