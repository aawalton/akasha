import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howTheEarthWorks = {
  id: "019db533-f39e-7ed9-bd14-4d00da5be3ea",
  type: "page-type/great-course",
  slug: "how-the-earth-works",
  title: "How the Earth Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1481.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-the-earth-works",
      externalLink: "https://plus.thegreatcourses.com/how-the-earth-works",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
