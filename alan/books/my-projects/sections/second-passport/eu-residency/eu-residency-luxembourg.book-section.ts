import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyLuxembourg = {
  id: "01a06594-c68a-7002-b322-f91c8c2d18be",
  pageTypeSlug: "book-section",
  slug: "eu-residency-luxembourg",
  title: "Luxembourg",
  sectionOfSlug: "book-section/second-passport/eu-residency",
  description:
    "Luxembourg residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/luxembourg.md.",
  partOfCollectionSlugs: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
