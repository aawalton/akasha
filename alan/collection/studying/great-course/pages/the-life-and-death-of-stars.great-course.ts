import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theLifeAndDeathOfStars = {
  id: "019db533-f39e-7bd5-aae1-c576eaa5aacc",
  type: "page-type/great-course",
  slug: "the-life-and-death-of-stars",
  title: "The Life and Death of Stars",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 715.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-life-and-death-of-stars",
      externalLink: "https://www.thegreatcoursesplus.com/the-life-and-death-of-stars",
    },
  ],
} as const satisfies GreatCourse
