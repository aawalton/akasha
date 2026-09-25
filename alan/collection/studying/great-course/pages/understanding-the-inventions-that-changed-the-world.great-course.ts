import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheInventionsThatChangedTheWorld = {
  id: "019db533-f39f-77b2-8004-6f751affc2ce",
  type: "page-type/great-course",
  slug: "understanding-the-inventions-that-changed-the-world",
  title: "Understanding the Inventions That Changed the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1053.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-inventions-that-changed-the-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-inventions-that-changed-the-world",
    },
  ],
} as const satisfies GreatCourse
