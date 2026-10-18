import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistoryOfBritishIndia = {
  id: "019db533-f3a0-7043-bd28-d2eabb90ff9f",
  type: "page-type/great-course",
  slug: "a-history-of-british-india",
  title: "A History of British India",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 737.4,
  ownProgress: 737.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-history-of-british-india",
      externalLink: "https://plus.thegreatcourses.com/a-history-of-british-india",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
