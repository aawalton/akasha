import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldSGreatestGeologicalWonders = {
  id: "019db533-f39f-73a6-964c-cf9a3996f535",
  type: "page-type/great-course",
  slug: "the-world-s-greatest-geological-wonders",
  title: "The World's Greatest Geological Wonders",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1114.2,
  ownProgress: 1114.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-worlds-greatest-geological-wonders",
      externalLink: "https://plus.thegreatcourses.com/the-worlds-greatest-geological-wonders",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
