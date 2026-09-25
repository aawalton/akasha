import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfInvestingLessonsFromHistorySGreatestTraders = {
  id: "019db533-f39e-73ea-b133-1d063675339d",
  type: "page-type/great-course",
  slug: "the-art-of-investing-lessons-from-history-s-greatest-traders",
  title: "The Art of Investing: Lessons from History's Greatest Traders",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 720,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-investing-lessons-from-historys-greatest-traders",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-art-of-investing-lessons-from-historys-greatest-traders",
    },
  ],
} as const satisfies GreatCourse
