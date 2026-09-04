import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euResidencyBulgaria = {
  id: "01a06594-c689-7008-8774-6bf2ff70b548",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-bulgaria",
  title: "Bulgaria",
  description:
    "Bulgaria residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/bulgaria.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
