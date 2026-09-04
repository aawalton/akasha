import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const aphantasiaMechanism = {
  id: "01a06594-c674-700f-9f5f-a4ee51ca552d",
  pageTypeSlug: "book-chapter",
  slug: "aphantasia-mechanism",
  title: "Aphantasia mechanism",
  description:
    "Aphantasia mechanism — three-stage Perception/Encoding/Recall model, with Alan's Recall stage broken.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
