import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const auditorySensitivityBundle = {
  id: "01a06594-c675-7002-ae05-68dd11ad7be0",
  pageTypeSlug: "book-chapter",
  slug: "auditory-sensitivity-bundle",
  title: "Auditory-sensitivity bundle",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
