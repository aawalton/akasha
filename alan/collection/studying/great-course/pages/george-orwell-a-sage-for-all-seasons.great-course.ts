import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const georgeOrwellASageForAllSeasons = {
  id: "019db533-f39e-79e7-adc9-76fa963166dc",
  type: "page-type/great-course",
  slug: "george-orwell-a-sage-for-all-seasons",
  title: "George Orwell: A Sage for All Seasons",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 622.2,
  ownProgress: 622.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "george-orwell",
      externalLink: "https://www.thegreatcoursesplus.com/george-orwell",
    },
  ],
} as const satisfies GreatCourse
