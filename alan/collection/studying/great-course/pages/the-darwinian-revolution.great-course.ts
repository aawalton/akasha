import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theDarwinianRevolution = {
  id: "019db533-f39e-7b5e-b894-6751c2c2820f",
  type: "page-type/great-course",
  slug: "the-darwinian-revolution",
  title: "The Darwinian Revolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 726.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-darwinian-revolution",
      externalLink: "https://plus.thegreatcourses.com/the-darwinian-revolution",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
