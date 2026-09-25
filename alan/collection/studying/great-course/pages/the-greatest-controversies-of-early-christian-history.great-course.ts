import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatestControversiesOfEarlyChristianHistory = {
  id: "019db533-f39e-7aab-b766-eebd181270e6",
  type: "page-type/great-course",
  slug: "the-greatest-controversies-of-early-christian-history",
  title: "The Greatest Controversies of Early Christian History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 682.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-greatest-controversies-of-early-christian-history",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-greatest-controversies-of-early-christian-history",
    },
  ],
} as const satisfies GreatCourse
