import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theStoryOfHumanLanguage = {
  id: "019db533-f39f-7b9e-9ec4-3f763779f48a",
  type: "page-type/great-course",
  slug: "the-story-of-human-language",
  title: "The Story of Human Language",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1086,
  ownProgress: 1086,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-story-of-human-language",
      externalLink: "https://www.thegreatcoursesplus.com/the-story-of-human-language",
    },
  ],
} as const satisfies GreatCourse
