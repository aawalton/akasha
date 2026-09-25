import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCathedral = {
  id: "019db533-f3a0-7126-a45b-0efc0fe2476e",
  type: "page-type/great-course",
  slug: "the-cathedral",
  title: "The Cathedral",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 739.8,
  ownProgress: 739.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-cathedral",
      externalLink: "https://www.thegreatcoursesplus.com/the-cathedral",
    },
  ],
} as const satisfies GreatCourse
