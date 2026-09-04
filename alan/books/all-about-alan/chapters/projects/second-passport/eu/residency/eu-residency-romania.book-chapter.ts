import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyRomania = {
  id: "01a06594-c68a-7007-b18b-0cbfb6c3a7f4",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-romania",
  title: "Romania",
  description:
    "Romania residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/romania.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
