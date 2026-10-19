import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeLessonsFromTheGreatBooks = {
  id: "019db533-f39e-7a21-bc18-652546c0dfd2",
  type: "page-type/great-course",
  slug: "life-lessons-from-the-great-books",
  title: "Life Lessons from the Great Books",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1092.35,
  ownProgress: 303.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "life-lessons-from-the-great-books",
      externalLink: "https://plus.thegreatcourses.com/life-lessons-from-the-great-books",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-19T16:58:42.714Z",
  progressedAt: "2026-10-19T16:58:42.714Z",
} as const satisfies GreatCourse
