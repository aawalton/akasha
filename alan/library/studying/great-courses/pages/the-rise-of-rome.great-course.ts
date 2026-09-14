import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const theRiseOfRome = {
  id: "019db533-f39f-7cdb-bbbd-ba4ac2b01c87",
  type: "great-course",
  slug: "the-rise-of-rome",
  title: "The Rise of Rome",
  status: "completed",
  rank: "B",
  unit: "minutes",
  ownLength: 733.8,
  ownProgress: 733.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "rise-of-rome",
      externalLink: "https://www.thegreatcoursesplus.com/rise-of-rome",
    },
  ],
} as const satisfies GreatCourse
