import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatVillainsOfHistory = {
  id: "01a06578-6718-7005-b8f2-5dd254a23519",
  type: "page-type/great-course",
  slug: "the-great-villains-of-history",
  title: "The Great Villains of History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-villains-of-history",
      externalLink: "https://plus.thegreatcourses.com/the-great-villains-of-history",
    },
  ],
} as const satisfies GreatCourse
