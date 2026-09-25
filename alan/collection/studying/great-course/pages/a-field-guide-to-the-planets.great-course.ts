import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aFieldGuideToThePlanets = {
  id: "019db533-f39f-73d0-a200-bfee62ffc8e4",
  type: "page-type/great-course",
  slug: "a-field-guide-to-the-planets",
  title: "A Field Guide to the Planets",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 760.2,
  ownProgress: 760.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-field-guide-to-the-planets",
      externalLink: "https://www.thegreatcoursesplus.com/a-field-guide-to-the-planets",
    },
  ],
} as const satisfies GreatCourse
