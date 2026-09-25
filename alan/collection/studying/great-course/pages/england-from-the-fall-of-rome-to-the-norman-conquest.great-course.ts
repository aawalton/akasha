import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const englandFromTheFallOfRomeToTheNormanConquest = {
  id: "019db533-f3a0-714f-8e4e-eff718023b65",
  type: "page-type/great-course",
  slug: "england-from-the-fall-of-rome-to-the-norman-conquest",
  title: "England: From the Fall of Rome to the Norman Conquest",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 723,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "england-from-the-fall-of-rome-to-the-norman-conquest",
      externalLink:
        "https://www.thegreatcoursesplus.com/england-from-the-fall-of-rome-to-the-norman-conquest",
    },
  ],
} as const satisfies GreatCourse
