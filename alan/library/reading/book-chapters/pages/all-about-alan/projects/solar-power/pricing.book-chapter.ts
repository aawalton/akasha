import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const pricing = {
  id: "01a06594-c68e-7004-8c32-5c397a0ecb16",
  pageTypeSlug: "book-chapter",
  slug: "pricing",
  title: "Rooftop Solar Pricing",
  description:
    "Rooftop solar pricing — component breakdown, levers, and cost-curve history for residential US (with Utah context).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
