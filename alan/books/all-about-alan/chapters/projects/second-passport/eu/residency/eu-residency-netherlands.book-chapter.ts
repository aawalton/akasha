import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyNetherlands = {
  id: "01a06594-c68a-7004-be93-01b074c2058b",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-netherlands",
  title: "Netherlands",
  description:
    "Netherlands residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/netherlands.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
