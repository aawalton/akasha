import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse30MasterpiecesOfTheAncientWorld = {
  id: "019db533-f3a0-75ff-b015-7ebe03dd843f",
  type: "page-type/great-course",
  slug: "great-course-30-masterpieces-of-the-ancient-world",
  title: "30 Masterpieces of the Ancient World",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1117.8,
  ownProgress: 1117.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "30-masterpieces-of-the-ancient-world",
      externalLink: "https://www.thegreatcoursesplus.com/30-masterpieces-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
