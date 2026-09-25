import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToDraw = {
  id: "019db533-f39f-79a8-a8af-99ca6bfe922c",
  type: "page-type/great-course",
  slug: "how-to-draw",
  title: "How to Draw",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1087.8,
  ownProgress: 1087.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-draw",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-draw",
    },
  ],
} as const satisfies GreatCourse
