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
      externalLink: "https://www.thegreatcoursesplus.com/the-life-and-works-of-jane-austen",
    },
  ],
} as const satisfies GreatCourse
