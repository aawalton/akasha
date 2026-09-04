import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euResidencyFinland = {
  id: "01a06594-c689-700d-8808-9821a33c3e3b",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-finland",
  title: "Finland",
  description:
    "Finland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/finland.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
