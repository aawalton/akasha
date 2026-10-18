import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatIdeasOfClassicalPhysics = {
  id: "019db533-f39f-729e-b9a0-3e7931cb716f",
  type: "page-type/great-course",
  slug: "great-ideas-of-classical-physics",
  title: "Great Ideas of Classical Physics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 735,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-ideas-of-classical-physics",
      externalLink: "https://plus.thegreatcourses.com/great-ideas-of-classical-physics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
