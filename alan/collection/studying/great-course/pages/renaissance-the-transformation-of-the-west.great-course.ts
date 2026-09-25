import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const renaissanceTheTransformationOfTheWest = {
  id: "019db533-f39f-78f3-a410-10c7f3f18963",
  type: "page-type/great-course",
  slug: "renaissance-the-transformation-of-the-west",
  title: "Renaissance: The Transformation of the West",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1596.6,
  ownProgress: 1596.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "renaissance-the-transformation-of-the-west",
      externalLink:
        "https://www.thegreatcoursesplus.com/renaissance-the-transformation-of-the-west",
    },
  ],
} as const satisfies GreatCourse
