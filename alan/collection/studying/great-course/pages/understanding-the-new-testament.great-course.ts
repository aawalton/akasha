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
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-new-testament",
    },
  ],
} as const satisfies GreatCourse
