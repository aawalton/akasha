import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyBelgium = {
  id: "01a06594-c689-7007-b0fa-b553fb718760",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-belgium",
  title: "Belgium",
  description:
    "Belgium residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/belgium.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
