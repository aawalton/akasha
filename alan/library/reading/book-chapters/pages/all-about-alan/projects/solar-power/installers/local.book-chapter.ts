import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const local = {
  id: "01a06594-c68d-7014-9386-9dc43e23e31d",
  pageTypeSlug: "book-chapter",
  slug: "local",
  title: "Local Utah Installers",
  description: "Utah-based local solar installers serving Provo / Utah County.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
