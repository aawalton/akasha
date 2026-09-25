import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const businessAndFinanceGreatCourses = {
  id: "019db533-f3a0-78e5-99ec-525da754f01a",
  type: "page-type/great-courses-subject",
  slug: "business-and-finance-great-courses",
  title: "Business & Finance Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-business-finance" },
  ],
} as const satisfies GreatCoursesSubject
