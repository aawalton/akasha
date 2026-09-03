import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const suicidalIdeation = {
  id: "01a06594-c685-7001-ab9a-81027250ae7a",
  pageTypeSlug: "book-chapter",
  slug: "suicidal-ideation",
  title: "Suicidal ideation",
  description:
    "Suicidal ideation — the lifelong arc, the age-7 first episode stopped by my own epistemic rigor, and survivors' stories (real and fictional) as the outside input that buys one more day.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
