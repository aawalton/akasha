import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const viralIntelligenceWhatIsCoronavirus = {
  id: "019db533-f3a0-7708-a336-cca85f97bb62",
  type: "page-type/great-course",
  slug: "viral-intelligence-what-is-coronavirus",
  title: "Viral Intelligence: What Is Coronavirus?",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 18,
  ownProgress: 18,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "viral-intelligence-whatiscoronavirus",
      externalLink: "https://www.thegreatcoursesplus.com/viral-intelligence-whatiscoronavirus",
    },
  ],
} as const satisfies GreatCourse
