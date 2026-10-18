import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursGermanyAndAustria = {
  id: "019db533-f39f-743a-b809-30778916c3f3",
  type: "page-type/great-course",
  slug: "the-great-tours-germany-and-austria",
  title: "The Great Tours: Germany and Austria",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 699.6,
  ownProgress: 699.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-germany-and-austria",
      externalLink: "https://plus.thegreatcourses.com/the-great-tours-germany-and-austria",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
