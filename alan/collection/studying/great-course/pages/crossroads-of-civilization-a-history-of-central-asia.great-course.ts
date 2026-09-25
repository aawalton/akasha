import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const crossroadsOfCivilizationAHistoryOfCentralAsia = {
  id: "019db533-f39f-7a5e-a6a7-c6e10e58b5d3",
  type: "page-type/great-course",
  slug: "crossroads-of-civilization-a-history-of-central-asia",
  title: "Crossroads of Civilization: A History of Central Asia",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 684.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "crossroads-of-civilization-a-history-of-central-asia",
      externalLink:
        "https://www.thegreatcoursesplus.com/crossroads-of-civilization-a-history-of-central-asia",
    },
  ],
} as const satisfies GreatCourse
