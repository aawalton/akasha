import type { GreatCourse } from "../../great-course.page-type.ts"

export const lifeLessonsFromTheGreatBooks = {
  id: "019db533-f39e-7a21-bc18-652546c0dfd2",
  pageTypeSlug: "great-course",
  slug: "life-lessons-from-the-great-books",
  title: "Life Lessons from the Great Books",
  status: "in-progress",
  unitSlug: "minutes",
  ownLength: 1091.4,
  ownProgress: 272.85,
  partOfSlugs: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "life-lessons-from-the-great-books",
  externalLink: "https://www.thegreatcoursesplus.com/life-lessons-from-the-great-books",
} as const satisfies GreatCourse
