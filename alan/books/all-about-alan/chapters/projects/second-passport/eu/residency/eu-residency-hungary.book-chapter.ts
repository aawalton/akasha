import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyHungary = {
  id: "01a06594-c689-7011-97ce-4ea5d56184fc",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-hungary",
  title: "Hungary",
  description:
    "Hungary residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/hungary.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
