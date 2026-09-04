import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const stoplightMechanic = {
  id: "01a06594-c684-7011-a711-91f52cefe07f",
  pageTypeSlug: "book-chapter",
  slug: "stoplight-mechanic",
  title: "The stoplight mechanic",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
