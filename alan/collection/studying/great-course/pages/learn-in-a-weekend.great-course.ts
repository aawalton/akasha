import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learnInAWeekend = {
  id: "019db533-f39e-75da-b361-aaede5f59448",
  type: "page-type/great-course",
  slug: "learn-in-a-weekend",
  title: "Learn in a Weekend",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 305.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learn-in-a-weekend",
      externalLink: "https://www.thegreatcoursesplus.com/learn-in-a-weekend",
    },
  ],
} as const satisfies GreatCourse
