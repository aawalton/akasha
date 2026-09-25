import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whatIsPain = {
  id: "01a06578-6719-7007-82ce-f4fef84b704a",
  type: "page-type/great-course",
  slug: "what-is-pain",
  title: "What Is Pain?",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "what-is-pain",
      externalLink: "https://plus.thegreatcourses.com/what-is-pain",
    },
  ],
} as const satisfies GreatCourse
