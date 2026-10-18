import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreekWorldAStudyOfHistoryAndCulture = {
  id: "019db533-f3a0-703f-8481-c79acab2f7a8",
  type: "page-type/great-course",
  slug: "the-greek-world-a-study-of-history-and-culture",
  title: "The Greek World: A Study of History and Culture",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 770.4,
  ownProgress: 770.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-greek-world-a-study-of-history-and-culture",
      externalLink:
        "https://plus.thegreatcourses.com/the-greek-world-a-study-of-history-and-culture",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
