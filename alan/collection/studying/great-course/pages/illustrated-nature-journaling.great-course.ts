import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const illustratedNatureJournaling = {
  id: "019db533-f39f-762a-b341-7d91b125f919",
  type: "page-type/great-course",
  slug: "illustrated-nature-journaling",
  title: "Illustrated Nature Journaling",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 137.4,
  ownProgress: 137.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "illustrated-nature-journaling",
      externalLink: "https://www.thegreatcoursesplus.com/illustrated-nature-journaling",
    },
  ],
} as const satisfies GreatCourse
