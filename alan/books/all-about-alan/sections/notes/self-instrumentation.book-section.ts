import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const selfInstrumentation = {
  id: "01a06594-c683-7005-b2fa-0e98d2bfdbca",
  pageTypeSlug: "book-section",
  slug: "self-instrumentation",
  title: "Self-instrumentation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
