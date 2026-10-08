import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeLessonsFromTheGreatMyths = {
  id: "019db533-f39e-7cd5-b782-feddf35dbd0d",
  type: "page-type/great-course",
  slug: "life-lessons-from-the-great-myths",
  title: "Life Lessons from the Great Myths",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1100.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "life-lessons-from-the-great-myths",
      externalLink: "https://www.thegreatcoursesplus.com/life-lessons-from-the-great-myths",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
