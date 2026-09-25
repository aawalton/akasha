import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const stAugustineSConfessions = {
  id: "019db533-f39e-7c63-863c-b176e0067cdd",
  type: "page-type/great-course",
  slug: "st-augustine-s-confessions",
  title: "St. Augustine's Confessions",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "st-augustines-confessions",
      externalLink: "https://www.thegreatcoursesplus.com/st-augustines-confessions",
    },
  ],
} as const satisfies GreatCourse
