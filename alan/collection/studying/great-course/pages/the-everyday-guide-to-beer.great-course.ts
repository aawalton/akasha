import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToBeer = {
  id: "019db533-f39f-783d-8e04-7d77c0c67c4b",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-beer",
  title: "The Everyday Guide to Beer",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 340.2,
  ownProgress: 340.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-beer",
      externalLink: "https://plus.thegreatcourses.com/the-everyday-guide-to-beer",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
