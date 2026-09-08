import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyGermany = {
  id: "01a06594-c689-700f-975d-7babb200bcc2",
  pageTypeSlug: "book-section",
  slug: "eu-residency-germany",
  title: "Germany",
  sectionOfSlug: "book-section/second-passport/eu-residency",
  description:
    "Germany residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/germany.md.",
  partOfSlugs: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
