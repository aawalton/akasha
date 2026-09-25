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
      externalLink: "https://www.thegreatcoursesplus.com/cities-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
