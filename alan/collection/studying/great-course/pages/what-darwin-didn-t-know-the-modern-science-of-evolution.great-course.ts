import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whatDarwinDidnTKnowTheModernScienceOfEvolution = {
  id: "019db533-f39e-7d00-b11e-a0ab3269d15d",
  type: "page-type/great-course",
  slug: "what-darwin-didn-t-know-the-modern-science-of-evolution",
  title: "What Darwin Didn't Know: The Modern Science of Evolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 766.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "what-darwin-didnt-know-the-modern-science-of-evolution",
      externalLink:
        "https://www.thegreatcoursesplus.com/what-darwin-didnt-know-the-modern-science-of-evolution",
    },
  ],
} as const satisfies GreatCourse
