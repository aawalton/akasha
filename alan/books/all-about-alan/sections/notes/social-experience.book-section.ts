import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const socialExperience = {
  id: "01a06594-c684-7006-b240-b37fb41b5ef6",
  pageTypeSlug: "book-section",
  slug: "social-experience",
  title: "Social experience",
  sectionOf: "all-about-alan",
  description:
    "Social experience — fatigue, eye contact, masking, conversation depth, expression-reading, communication style, group size, empathy.",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
