import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const mana = {
  id: "01a06594-c67b-7002-9345-ef7938e65981",
  pageTypeSlug: "book-chapter",
  slug: "mana",
  title: "Mana",
  description:
    "Mana — executive function. Levels of neurotransmitters and energy resources in the brain. Currently at stoplight resolution; reads through wantingness magnitude.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
