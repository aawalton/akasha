import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const everydayEngineeringUnderstandingTheMarvelsOfDailyLife = {
  id: "019db533-f39f-7035-b550-e7f4f20aa70f",
  type: "page-type/great-course",
  slug: "everyday-engineering-understanding-the-marvels-of-daily-life",
  title: "Everyday Engineering: Understanding the Marvels of Daily Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1132.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "everyday-engineering-understanding-the-marvels-of-daily-life",
      externalLink:
        "https://www.thegreatcoursesplus.com/everyday-engineering-understanding-the-marvels-of-daily-life",
    },
  ],
} as const satisfies GreatCourse
