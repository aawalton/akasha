import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const softwareAndSaas = {
  id: "01a06594-c684-7007-a95e-c7f7465962a8",
  pageTypeSlug: "book-chapter",
  slug: "software-and-saas",
  title: "Software and SaaS",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
