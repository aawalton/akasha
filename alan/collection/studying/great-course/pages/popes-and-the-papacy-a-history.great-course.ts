import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const popesAndThePapacyAHistory = {
  id: "019db533-f39e-7a1b-afa5-7fb4948ed370",
  type: "page-type/great-course",
  slug: "popes-and-the-papacy-a-history",
  title: "Popes and the Papacy: A History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 735,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "popes-and-the-papacy-a-history",
      externalLink: "https://www.thegreatcoursesplus.com/popes-and-the-papacy-a-history",
    },
  ],
} as const satisfies GreatCourse
