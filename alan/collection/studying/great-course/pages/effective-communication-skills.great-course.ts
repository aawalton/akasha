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
      externalLink: "https://www.thegreatcoursesplus.com/effective-communication-skills",
    },
  ],
} as const satisfies GreatCourse
