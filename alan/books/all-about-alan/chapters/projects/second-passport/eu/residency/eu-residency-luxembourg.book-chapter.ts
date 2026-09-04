import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyLuxembourg = {
  id: "01a06594-c68a-7002-b322-f91c8c2d18be",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-luxembourg",
  title: "Luxembourg",
  description:
    "Luxembourg residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/luxembourg.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
