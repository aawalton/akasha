import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePsychologyOfPerformanceHowToBeYourBestInLife = {
  id: "019db533-f3a0-7728-8885-6e6684fd266f",
  type: "page-type/great-course",
  slug: "the-psychology-of-performance-how-to-be-your-best-in-life",
  title: "The Psychology of Performance: How to Be Your Best in Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-psychology-of-performance-how-to-be-your-best-in-life",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-psychology-of-performance-how-to-be-your-best-in-life",
    },
  ],
} as const satisfies GreatCourse
