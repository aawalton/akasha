import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const stamina = {
  id: "01a06594-c684-700a-8531-35abbc51d67a",
  pageTypeSlug: "book-chapter",
  slug: "stamina",
  title: "Stamina",
  description:
    "Stamina — physical energy. Levels of energy resources in the body. Currently at stoplight resolution; reads through signed valence on movement.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
