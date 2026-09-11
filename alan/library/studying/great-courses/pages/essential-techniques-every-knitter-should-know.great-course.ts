import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const essentialTechniquesEveryKnitterShouldKnow = {
  id: "019db533-f39e-748b-96e4-8856679b7aa6",
  type: "great-course",
  slug: "essential-techniques-every-knitter-should-know",
  title: "Essential Techniques Every Knitter Should Know",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 202.2,
  ownProgress: 202.2,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "essential-techniques-every-knitter-should-know",
  externalLink:
    "https://www.thegreatcoursesplus.com/essential-techniques-every-knitter-should-know",
} as const satisfies GreatCourse
