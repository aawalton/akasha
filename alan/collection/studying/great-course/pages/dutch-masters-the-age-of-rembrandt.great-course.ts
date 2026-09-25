import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const dutchMastersTheAgeOfRembrandt = {
  id: "019db533-f39f-7680-84b1-400c5827b97c",
  type: "page-type/great-course",
  slug: "dutch-masters-the-age-of-rembrandt",
  title: "Dutch Masters: The Age of Rembrandt",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1083,
  ownProgress: 1083,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "dutch-masters-the-age-of-rembrandt",
      externalLink: "https://www.thegreatcoursesplus.com/dutch-masters-the-age-of-rembrandt",
    },
  ],
} as const satisfies GreatCourse
