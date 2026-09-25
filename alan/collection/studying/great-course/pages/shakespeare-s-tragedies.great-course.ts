import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const shakespeareSTragedies = {
  id: "019db533-f39e-787a-8684-f9e0ee7505a7",
  type: "page-type/great-course",
  slug: "shakespeare-s-tragedies",
  title: "Shakespeare's Tragedies",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 831,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "shakespeares-tragedies",
      externalLink: "https://www.thegreatcoursesplus.com/shakespeares-tragedies",
    },
  ],
} as const satisfies GreatCourse
