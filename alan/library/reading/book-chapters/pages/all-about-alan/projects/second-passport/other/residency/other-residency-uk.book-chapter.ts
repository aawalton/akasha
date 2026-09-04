import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const otherResidencyUk = {
  id: "01a06594-c68c-700a-8d9c-c3035c0d4d7a",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-uk",
  title: "Uk",
  description:
    "UK residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/uk.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
