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
      externalLink: "https://www.thegreatcoursesplus.com/life-lessons-from-the-great-books",
    },
  ],
} as const satisfies GreatCourse
