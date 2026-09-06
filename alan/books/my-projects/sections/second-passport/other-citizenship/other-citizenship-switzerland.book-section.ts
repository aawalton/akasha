import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipSwitzerland = {
  id: "01a06594-c68b-7009-9f27-8d10ab995fab",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-switzerland",
  title: "Switzerland",
  description: "Switzerland citizenship paths (May 2026 snapshot).",
  partOfSlugs: ["other-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
