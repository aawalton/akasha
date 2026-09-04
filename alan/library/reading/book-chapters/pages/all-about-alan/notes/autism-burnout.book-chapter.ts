import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const autismBurnout = {
  id: "01a06594-c675-7004-89a8-d7de239bf423",
  pageTypeSlug: "book-chapter",
  slug: "autism-burnout",
  title: "Autistic burnout",
  description:
    "Autistic burnout — Alan's 18-year compound decline (sustained ~50% deficit between stressors and recovery), the catastrophic low, and the current recovery trajectory.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
