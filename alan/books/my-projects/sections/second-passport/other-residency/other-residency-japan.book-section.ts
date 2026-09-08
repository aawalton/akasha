import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyJapan = {
  id: "01a06594-c68c-7000-bb95-2c864c7e4f4c",
  pageTypeSlug: "book-section",
  slug: "other-residency-japan",
  title: "Japan",
  sectionOfSlug: "book-section/second-passport/other-residency",
  description: "Japan residency paths (May 2026 snapshot).",
  partOfCollectionSlugs: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
