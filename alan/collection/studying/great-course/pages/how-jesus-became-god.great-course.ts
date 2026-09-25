import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howJesusBecameGod = {
  id: "019db533-f39f-7868-9f07-058dbefd6895",
  type: "page-type/great-course",
  slug: "how-jesus-became-god",
  title: "How Jesus Became God",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 751.8,
  ownProgress: 751.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-jesus-became-god",
      externalLink: "https://www.thegreatcoursesplus.com/how-jesus-became-god",
    },
  ],
} as const satisfies GreatCourse
