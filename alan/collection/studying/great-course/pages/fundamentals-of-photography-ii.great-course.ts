import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fundamentalsOfPhotographyIi = {
  id: "019db533-f39f-76e1-808f-be4eed8f66ff",
  type: "page-type/great-course",
  slug: "fundamentals-of-photography-ii",
  title: "Fundamentals of Photography II",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 732.6,
  ownProgress: 732.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fundamentals-of-photography-ii",
      externalLink: "https://www.thegreatcoursesplus.com/fundamentals-of-photography-ii",
    },
  ],
} as const satisfies GreatCourse
