import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const georgeOrwellASageForAllSeasons = {
  id: "019db533-f39e-79e7-adc9-76fa963166dc",
  type: "page-type/great-course",
  slug: "george-orwell-a-sage-for-all-seasons",
  title: "George Orwell: A Sage for All Seasons",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 622.2,
  ownProgress: 622.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "george-orwell",
      externalLink: "https://plus.thegreatcourses.com/george-orwell",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
