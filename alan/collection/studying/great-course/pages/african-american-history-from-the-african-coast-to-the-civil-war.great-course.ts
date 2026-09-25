import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const africanAmericanHistoryFromTheAfricanCoastToTheCivilWar = {
  id: "019db533-f39f-7aa8-9dcc-6cc1e14240be",
  type: "page-type/great-course",
  slug: "african-american-history-from-the-african-coast-to-the-civil-war",
  title: "African American History: From the African Coast to the Civil War",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 750,
  ownProgress: 750,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "african-american-history-from-the-african-coast-to-the-civil-war",
      externalLink:
        "https://www.thegreatcoursesplus.com/african-american-history-from-the-african-coast-to-the-civil-war",
    },
  ],
} as const satisfies GreatCourse
