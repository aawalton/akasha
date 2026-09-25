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
      externalLink: "https://www.thegreatcoursesplus.com/ancient-greek-civilization",
    },
  ],
} as const satisfies GreatCourse
