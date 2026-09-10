import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherCitizenshipSwitzerland = {
  id: "01a06594-c68b-7009-9f27-8d10ab995fab",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-switzerland",
  title: "Switzerland",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Switzerland citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
