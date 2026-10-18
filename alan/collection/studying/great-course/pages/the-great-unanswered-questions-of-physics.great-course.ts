import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatUnansweredQuestionsOfPhysics = {
  id: "019db533-f389-7141-939d-bb5945fcd753",
  type: "page-type/great-course",
  slug: "the-great-unanswered-questions-of-physics",
  title: "The Great Unanswered Questions of Physics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 751.3,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-unanswered-questions-of-physics",
      externalLink: "https://plus.thegreatcourses.com/the-great-unanswered-questions-of-physics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.025Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
