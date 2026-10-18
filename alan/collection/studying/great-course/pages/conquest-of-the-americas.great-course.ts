import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const conquestOfTheAmericas = {
  id: "019db533-f39f-7e8d-9bf0-c6669ec1e4da",
  type: "page-type/great-course",
  slug: "conquest-of-the-americas",
  title: "Conquest of the Americas",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "conquest-of-the-americas",
      externalLink: "https://plus.thegreatcourses.com/conquest-of-the-americas",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
