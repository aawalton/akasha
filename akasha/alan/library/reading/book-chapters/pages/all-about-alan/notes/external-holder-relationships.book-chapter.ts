import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const externalHolderRelationships = {
  id: "01a06594-c679-7006-ad41-fb5163e34da9",
  pageTypeSlug: "book-chapter",
  slug: "external-holder-relationships",
  title: "Relationships held from the outside",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
