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
      externalLink: "https://www.thegreatcoursesplus.com/great-ideas-of-classical-physics",
    },
  ],
} as const satisfies GreatCourse
