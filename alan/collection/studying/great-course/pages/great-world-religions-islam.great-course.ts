import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsIslam = {
  id: "019db533-f39e-7d2b-8716-8ec902b253f4",
  type: "page-type/great-course",
  slug: "great-world-religions-islam",
  title: "Great World Religions: Islam",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-islam",
      externalLink: "https://www.thegreatcoursesplus.com/great-world-religions-islam",
    },
  ],
} as const satisfies GreatCourse
