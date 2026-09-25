import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheBrain = {
  id: "019db533-f39f-7095-b6ad-6a7fecfe4c2b",
  type: "page-type/great-course",
  slug: "understanding-the-brain",
  title: "Understanding the Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1122,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-brain",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-brain",
    },
  ],
} as const satisfies GreatCourse
