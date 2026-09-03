import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euResidencyMalta = {
  id: "01a06594-c68a-7003-8366-62d93d057399",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-malta",
  title: "Malta",
  description:
    "Malta residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/malta.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
