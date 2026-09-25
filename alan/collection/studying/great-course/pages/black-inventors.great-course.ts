import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const blackInventors = {
  id: "019db533-f3a0-74ff-82df-7bb550784d87",
  type: "page-type/great-course",
  slug: "black-inventors",
  title: "Black Inventors",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 30.6,
  ownProgress: 30.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "black-inventors",
      externalLink: "https://www.thegreatcoursesplus.com/black-inventors",
    },
  ],
} as const satisfies GreatCourse
