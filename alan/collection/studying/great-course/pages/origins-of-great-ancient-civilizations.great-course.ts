import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const originsOfGreatAncientCivilizations = {
  id: "019db533-f3a0-70a4-a9d7-cbe4fd8b3d40",
  type: "page-type/great-course",
  slug: "origins-of-great-ancient-civilizations",
  title: "Origins of Great Ancient Civilizations",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 370.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "origins-of-great-ancient-civilizations",
      externalLink: "https://www.thegreatcoursesplus.com/origins-of-great-ancient-civilizations",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
