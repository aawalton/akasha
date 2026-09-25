import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToAstrophysics = {
  id: "019db533-f39e-7f4d-ac81-921a7828df8f",
  type: "page-type/great-course",
  slug: "introduction-to-astrophysics",
  title: "Introduction to Astrophysics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 790.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-astrophysics",
      externalLink: "https://www.thegreatcoursesplus.com/introduction-to-astrophysics",
    },
  ],
} as const satisfies GreatCourse
