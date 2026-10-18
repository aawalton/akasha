import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const effectiveCommunicationSkills = {
  id: "019db533-f39e-78e5-a6d0-9d37c2f92ef9",
  type: "page-type/great-course",
  slug: "effective-communication-skills",
  title: "Effective Communication Skills",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 712.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "effective-communication-skills",
      externalLink: "https://plus.thegreatcourses.com/effective-communication-skills",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
