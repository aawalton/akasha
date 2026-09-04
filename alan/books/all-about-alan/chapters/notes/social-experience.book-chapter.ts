import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const socialExperience = {
  id: "01a06594-c684-7006-b240-b37fb41b5ef6",
  pageTypeSlug: "book-chapter",
  slug: "social-experience",
  title: "Social experience",
  description:
    "Social experience — fatigue, eye contact, masking, conversation depth, expression-reading, communication style, group size, empathy.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
