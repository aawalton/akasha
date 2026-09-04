import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencySpain = {
  id: "01a06594-c68a-700a-8ebf-ffc96523aac2",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-spain",
  title: "Spain",
  description:
    "Spain residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/spain.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
