import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencyAustralia = {
  id: "01a06594-c68b-7015-9670-0b91737b307b",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-australia",
  title: "Australia",
  description:
    "Australia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/australia.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
