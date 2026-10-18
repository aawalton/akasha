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
      externalLink: "https://plus.thegreatcourses.com/how-jesus-became-god",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
