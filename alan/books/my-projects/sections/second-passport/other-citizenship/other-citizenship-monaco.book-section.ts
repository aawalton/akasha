import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipMonaco = {
  id: "01a06594-c68b-7003-a540-01601bea5c73",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-monaco",
  title: "Monaco",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Monaco citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
