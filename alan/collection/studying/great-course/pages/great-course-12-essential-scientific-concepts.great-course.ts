import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse12EssentialScientificConcepts = {
  id: "019db533-f39f-7484-9416-047aa74bca71",
  type: "page-type/great-course",
  slug: "great-course-12-essential-scientific-concepts",
  title: "12 Essential Scientific Concepts",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 724.2,
  ownProgress: 724.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "12-essential-scientific-concepts",
      externalLink: "https://plus.thegreatcourses.com/12-essential-scientific-concepts",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
