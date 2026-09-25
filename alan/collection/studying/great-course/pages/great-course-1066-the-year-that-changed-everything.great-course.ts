import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse1066TheYearThatChangedEverything = {
  id: "019db533-f39f-7ab3-aef0-c862f7e2571f",
  type: "page-type/great-course",
  slug: "great-course-1066-the-year-that-changed-everything",
  title: "1066: The Year That Changed Everything",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 204,
  ownProgress: 204,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "1066-the-year-that-changed-everything",
      externalLink: "https://www.thegreatcoursesplus.com/1066-the-year-that-changed-everything",
    },
  ],
} as const satisfies GreatCourse
