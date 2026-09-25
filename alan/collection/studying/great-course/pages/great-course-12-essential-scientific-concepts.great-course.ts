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
      externalLink: "https://www.thegreatcoursesplus.com/12-essential-scientific-concepts",
    },
  ],
} as const satisfies GreatCourse
