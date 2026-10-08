import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const treatingAnxiety = {
  id: "019db533-f3a0-7689-a6e9-ab565d88eaf4",
  type: "page-type/great-course",
  slug: "treating-anxiety",
  title: "Treating Anxiety",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 357,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "treating-anxiety",
      externalLink: "https://www.thegreatcoursesplus.com/treating-anxiety",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
