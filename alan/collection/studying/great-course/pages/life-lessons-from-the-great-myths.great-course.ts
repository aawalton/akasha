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
      externalLink: "https://plus.thegreatcourses.com/life-lessons-from-the-great-myths",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
