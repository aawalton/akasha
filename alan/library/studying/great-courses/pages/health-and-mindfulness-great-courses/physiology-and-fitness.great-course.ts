import type { GreatCourse } from "../../great-course.page-type.ts"

export const physiologyAndFitness = {
  id: "019db533-f3a0-77b1-9ae8-3b22ca32c20a",
  pageTypeSlug: "great-course",
  slug: "physiology-and-fitness",
  title: "Physiology and Fitness",
  status: "in-progress",
  unitSlug: "minutes",
  ownLength: 1130.4,
  ownProgress: 345.4,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "physiology-and-fitness",
  externalLink: "https://www.thegreatcoursesplus.com/physiology-and-fitness",
} as const satisfies GreatCourse
