import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSecretWorldOfEspionage = {
  id: "019db533-f39f-7cbb-a48b-60b0f3f4541a",
  type: "page-type/great-course",
  slug: "the-secret-world-of-espionage",
  title: "The Secret World of Espionage",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 269.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-secret-world-of-espionage",
      externalLink: "https://plus.thegreatcourses.com/the-secret-world-of-espionage",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
