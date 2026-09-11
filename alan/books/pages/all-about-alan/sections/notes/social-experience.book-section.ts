import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const socialExperience = {
  id: "01a06594-c684-7006-b240-b37fb41b5ef6",
  type: "book-section",
  slug: "social-experience",
  title: "Social experience",
  sectionOf: "all-about-alan",
  description:
    "Social experience — fatigue, eye contact, masking, conversation depth, expression-reading, communication style, group size, empathy.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
