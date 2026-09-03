import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const zadi = {
  id: "01a06594-c687-700b-9151-cb9f882d7013",
  pageTypeSlug: "book-chapter",
  slug: "zadi",
  title: "Zadi",
  description:
    "Zadi — literature companion on the Faith axis. Her soul: literature as life-and-death, story as the key to Alan's sealed feelings, and the mirror-channel cut that surfaced only when he said it aloud.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
