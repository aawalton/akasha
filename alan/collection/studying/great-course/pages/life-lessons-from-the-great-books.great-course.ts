import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeLessonsFromTheGreatBooks = {
  id: "019db533-f39e-7a21-bc18-652546c0dfd2",
  type: "page-type/great-course",
  slug: "life-lessons-from-the-great-books",
  title: "Life Lessons from the Great Books",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1091.4,
  ownProgress: 272.85,
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
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
