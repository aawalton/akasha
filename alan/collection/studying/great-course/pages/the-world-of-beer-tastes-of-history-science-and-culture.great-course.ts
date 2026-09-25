import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldOfBeerTastesOfHistoryScienceAndCulture = {
  id: "019db533-f39f-76f6-928f-c02826ba366d",
  type: "page-type/great-course",
  slug: "the-world-of-beer-tastes-of-history-science-and-culture",
  title: "The World of Beer: Tastes of History, Science, and Culture",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 425.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-of-beer-tastes-of-history-science-and-culture",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-world-of-beer-tastes-of-history-science-and-culture",
    },
  ],
} as const satisfies GreatCourse
