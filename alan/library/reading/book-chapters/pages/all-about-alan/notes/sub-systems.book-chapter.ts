import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const subSystems = {
  id: "01a06594-c685-7000-af1e-123d2f32bfdd",
  pageTypeSlug: "book-chapter",
  slug: "sub-systems",
  title: "Concrete sub-systems already named",
  description:
    "Concrete sub-systems already named — index of promoted dedicated files plus deferred threads. All starter sub-systems have been promoted.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
