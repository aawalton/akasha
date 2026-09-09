import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const subSystems = {
  id: "01a06594-c685-7000-af1e-123d2f32bfdd",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sub-systems",
  title: "Concrete sub-systems already named",
  sectionOf: "all-about-alan",
  description:
    "Concrete sub-systems already named — index of promoted dedicated files plus deferred threads. All starter sub-systems have been promoted.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
