import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyGermany = {
  id: "01a06594-c689-700f-975d-7babb200bcc2",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-germany",
  title: "Germany",
  description:
    "Germany residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/germany.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
