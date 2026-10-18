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
      externalLink: "https://plus.thegreatcourses.com/illustrated-nature-journaling",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
