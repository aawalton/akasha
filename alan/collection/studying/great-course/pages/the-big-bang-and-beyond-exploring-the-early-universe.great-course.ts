import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBigBangAndBeyondExploringTheEarlyUniverse = {
  id: "019db533-f39f-71ab-851a-45ba518a3880",
  type: "page-type/great-course",
  slug: "the-big-bang-and-beyond-exploring-the-early-universe",
  title: "The Big Bang and Beyond: Exploring the Early Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 372,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-big-bang-and-beyond-exploring-the-early-universe",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-big-bang-and-beyond-exploring-the-early-universe",
    },
  ],
} as const satisfies GreatCourse
