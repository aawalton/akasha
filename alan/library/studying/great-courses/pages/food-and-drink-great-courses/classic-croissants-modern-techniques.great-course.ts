import type { GreatCourse } from "../../great-course.page-type.ts"

export const classicCroissantsModernTechniques = {
  id: "019db533-f39f-7a7e-9378-e91ff13dad62",
  pageTypeSlug: "great-course",
  slug: "classic-croissants-modern-techniques",
  title: "Classic Croissants, Modern Techniques",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 108,
  ownProgress: 108,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "classic-croissants-modern-techniques",
  externalLink: "https://www.thegreatcoursesplus.com/classic-croissants-modern-techniques",
} as const satisfies GreatCourse
