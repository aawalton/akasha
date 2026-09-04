import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const national = {
  id: "01a06594-c68d-7015-89b5-ae0c218f5068",
  pageTypeSlug: "book-chapter",
  slug: "national",
  title: "National Installers",
  description: "National multi-state solar installers with Utah / Provo presence.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
