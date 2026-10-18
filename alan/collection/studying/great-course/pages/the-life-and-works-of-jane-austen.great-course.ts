import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theLifeAndWorksOfJaneAusten = {
  id: "019db533-f39e-778c-8157-07692855a6f7",
  type: "page-type/great-course",
  slug: "the-life-and-works-of-jane-austen",
  title: "The Life and Works of Jane Austen",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 703.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-life-and-works-of-jane-austen",
      externalLink: "https://plus.thegreatcourses.com/the-life-and-works-of-jane-austen",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
