import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const citiesOfTheAncientWorld = {
  id: "019db533-f39f-7ea2-a01f-5b5c5d899b6a",
  type: "page-type/great-course",
  slug: "cities-of-the-ancient-world",
  title: "Cities of the Ancient World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 709.8,
  ownProgress: 709.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cities-of-the-ancient-world",
      externalLink: "https://plus.thegreatcourses.com/cities-of-the-ancient-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
