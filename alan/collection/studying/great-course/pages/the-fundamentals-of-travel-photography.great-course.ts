import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theFundamentalsOfTravelPhotography = {
  id: "019db533-f39f-74a3-9cfa-0c101fb23fa2",
  type: "page-type/great-course",
  slug: "the-fundamentals-of-travel-photography",
  title: "The Fundamentals of Travel Photography",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 601.2,
  ownProgress: 601.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-fundamentals-of-travel-photography",
      externalLink: "https://plus.thegreatcourses.com/the-fundamentals-of-travel-photography",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
