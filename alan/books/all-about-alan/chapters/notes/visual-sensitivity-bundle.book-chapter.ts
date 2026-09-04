import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const visualSensitivityBundle = {
  id: "01a06594-c686-7000-901b-c7b8423ef6b7",
  pageTypeSlug: "book-chapter",
  slug: "visual-sensitivity-bundle",
  title: "Visual-sensitivity bundle",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
