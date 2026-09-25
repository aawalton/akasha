import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const virtualVenice = {
  id: "019db533-f39f-72fd-8750-0e746dd40305",
  type: "page-type/great-course",
  slug: "virtual-venice",
  title: "Virtual Venice",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 39.6,
  ownProgress: 39.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "virtual-venice",
      externalLink: "https://www.thegreatcoursesplus.com/virtual-venice",
    },
  ],
} as const satisfies GreatCourse
