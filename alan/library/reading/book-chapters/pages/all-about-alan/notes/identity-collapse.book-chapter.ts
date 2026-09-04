import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const identityCollapse = {
  id: "01a06594-c67a-700b-ae82-c39217185ad5",
  pageTypeSlug: "book-chapter",
  slug: "identity-collapse",
  title: "Identity collapse",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
