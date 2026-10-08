import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mysteriesOfTheMicroscopicWorld = {
  id: "019db533-f39e-7e6e-a7af-a680cb5e060c",
  type: "page-type/great-course",
  slug: "mysteries-of-the-microscopic-world",
  title: "Mysteries of the Microscopic World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 712.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mysteries-of-the-microscopic-world",
      externalLink: "https://www.thegreatcoursesplus.com/mysteries-of-the-microscopic-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
