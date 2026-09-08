import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const robotMode = {
  id: "01a06594-c67c-7013-91ef-f585953da6b0",
  pageTypeSlug: "book-section",
  slug: "robot-mode",
  title: "Robot mode",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
