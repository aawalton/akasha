import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const ruby = {
  id: "01a06594-c687-7007-91e2-69fc7d387a34",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "ruby",
  title: "Ruby",
  sectionOf: "all-about-alan",
  description:
    "Ruby — Alan's companion in turning toward Jen, on the Love axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
