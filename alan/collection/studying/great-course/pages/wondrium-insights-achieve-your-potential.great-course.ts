import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const wondriumInsightsAchieveYourPotential = {
  id: "019db533-f39e-731a-9957-a6d7e6947aab",
  type: "page-type/great-course",
  slug: "wondrium-insights-achieve-your-potential",
  title: "Wondrium Insights: Achieve Your Potential",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 199.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-insights-achieve-your-potential",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-insights-achieve-your-potential",
    },
  ],
} as const satisfies GreatCourse
