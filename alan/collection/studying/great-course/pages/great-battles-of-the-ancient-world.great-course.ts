import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatBattlesOfTheAncientWorld = {
  id: "019db533-f3a0-7175-9a72-04a148bb9393",
  type: "page-type/great-course",
  slug: "great-battles-of-the-ancient-world",
  title: "Great Battles of the Ancient World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-battles-of-the-ancient-world",
      externalLink: "https://www.thegreatcoursesplus.com/great-battles-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
