import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const ephemeralSelf = {
  id: "01a06594-c679-7004-9206-df782ef33c0b",
  pageTypeSlug: "book-chapter",
  slug: "ephemeral-self",
  title: "The ephemeral self",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
