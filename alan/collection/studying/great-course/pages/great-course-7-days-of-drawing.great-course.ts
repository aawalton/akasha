import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse7DaysOfDrawing = {
  id: "019db533-f39f-7807-962a-19b34b4a4402",
  type: "page-type/great-course",
  slug: "great-course-7-days-of-drawing",
  title: "7 Days of Drawing",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 94.2,
  ownProgress: 94.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "7-days-of-drawing",
      externalLink: "https://www.thegreatcoursesplus.com/7-days-of-drawing",
    },
  ],
} as const satisfies GreatCourse
