import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const economics3rdEdition = {
  id: "019db533-f39e-7474-a954-b1cb5e6c48c4",
  type: "page-type/great-course",
  slug: "economics-3rd-edition",
  title: "Economics, 3rd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1111.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "economics-3rd-edition",
      externalLink: "https://www.thegreatcoursesplus.com/economics-3rd-edition",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
