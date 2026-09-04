import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euResidencySweden = {
  id: "01a06594-c68a-700c-a1c4-94572ff6c59e",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-sweden",
  title: "Sweden",
  description:
    "Sweden residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/sweden.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
