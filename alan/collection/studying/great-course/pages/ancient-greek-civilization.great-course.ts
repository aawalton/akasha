import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ancientGreekCivilization = {
  id: "019db533-f39f-7ed7-bdd5-bcbcfca8ac36",
  type: "page-type/great-course",
  slug: "ancient-greek-civilization",
  title: "Ancient Greek Civilization",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 723,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ancient-greek-civilization",
      externalLink: "https://plus.thegreatcourses.com/ancient-greek-civilization",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
