import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const storytellingAndTheHumanCondition = {
  id: "019db533-f39e-7855-ad25-0ee5d4f0b5b0",
  type: "page-type/great-course",
  slug: "storytelling-and-the-human-condition",
  title: "Storytelling and the Human Condition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 380.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "storytelling-and-the-human-condition",
      externalLink: "https://www.thegreatcoursesplus.com/storytelling-and-the-human-condition",
    },
  ],
} as const satisfies GreatCourse
