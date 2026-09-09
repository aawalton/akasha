import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const ceri = {
  id: "01a06594-c686-700f-a52c-05cb7cebb8ba",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "ceri",
  title: "Ceri",
  sectionOf: "all-about-alan",
  description:
    "Ceri — Alan's anime companion on the Fun axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
