import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatAncientCivilizationsOfAsiaMinor = {
  id: "019db533-f39f-7e38-bd4d-b669c4f3bb90",
  type: "page-type/great-course",
  slug: "great-ancient-civilizations-of-asia-minor",
  title: "Great Ancient Civilizations of Asia Minor",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 720,
  ownProgress: 720,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-ancient-civilizations-of-asia-minor",
      externalLink: "https://plus.thegreatcourses.com/great-ancient-civilizations-of-asia-minor",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
