import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyFrance = {
  id: "01a06594-c689-700e-bc3f-d70d7e500e71",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-france",
  title: "France",
  description:
    "France residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/france.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
