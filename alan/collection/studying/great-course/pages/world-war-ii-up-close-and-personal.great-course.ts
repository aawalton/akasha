import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const worldWarIiUpCloseAndPersonal = {
  id: "019db533-f3a0-71c7-ab61-f5f7ec0fd339",
  type: "page-type/great-course",
  slug: "world-war-ii-up-close-and-personal",
  title: "World War II: Up Close and Personal",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 693,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "world-war-ii-up-close-and-personal",
      externalLink: "https://www.thegreatcoursesplus.com/world-war-ii-up-close-and-personal",
    },
  ],
} as const satisfies GreatCourse
