import type { BookSection } from "../../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencySwitzerland = {
  id: "01a06594-c68c-7009-bfa1-dc29e2a81b0e",
  pageTypeSlug: "book-section",
  slug: "other-residency-switzerland",
  title: "Switzerland",
  description: "Switzerland residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
