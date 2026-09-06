import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyIceland = {
  id: "01a06594-c68b-7017-9f6b-0b462b32e583",
  pageTypeSlug: "book-section",
  slug: "other-residency-iceland",
  title: "Iceland",
  description: "Iceland residency paths (May 2026 snapshot).",
  partOfSlugs: ["other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
