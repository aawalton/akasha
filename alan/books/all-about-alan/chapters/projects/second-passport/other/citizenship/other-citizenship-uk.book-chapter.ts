import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherCitizenshipUk = {
  id: "01a06594-c68b-700a-bead-e7a607bce2c3",
  pageTypeSlug: "book-chapter",
  slug: "other-citizenship-uk",
  title: "United Kingdom — Paths to Citizenship (May 2026)",
  description:
    "UK citizenship paths (May 2026 snapshot). For residency paths, see ../residency/uk.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
