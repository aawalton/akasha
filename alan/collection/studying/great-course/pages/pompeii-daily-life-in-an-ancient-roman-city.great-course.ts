import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pompeiiDailyLifeInAnAncientRomanCity = {
  id: "019db533-f39f-7e23-84f5-8306422762b3",
  type: "page-type/great-course",
  slug: "pompeii-daily-life-in-an-ancient-roman-city",
  title: "Pompeii: Daily Life in an Ancient Roman City",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 705.6,
  ownProgress: 705.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pompeii-daily-life-in-an-ancient-roman-city",
      externalLink:
        "https://www.thegreatcoursesplus.com/pompeii-daily-life-in-an-ancient-roman-city",
    },
  ],
} as const satisfies GreatCourse
