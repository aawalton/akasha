import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheNewTestament = {
  id: "019db533-f39e-7b4f-aa49-a3f93ac17921",
  type: "page-type/great-course",
  slug: "understanding-the-new-testament",
  title: "Understanding the New Testament",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-new-testament",
      externalLink: "https://plus.thegreatcourses.com/understanding-the-new-testament",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
