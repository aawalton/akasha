import type { GreatCourse } from "../great-course.page-type.ts"

export const englishGrammarBootCamp = {
  id: "019db533-f39e-7765-a92b-ace7a7c97a99",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "english-grammar-boot-camp",
  title: "English Grammar Boot Camp",
  status: "completed",
  rank: "B",
  unit: "minutes",
  ownLength: 753,
  ownProgress: 753,
  partOfCollections: [
    "all-great-courses",
    "literature-great-courses",
    "professional-growth-great-courses",
  ],
  source: "the-great-courses",
  externalId: "english-grammar-boot-camp",
  externalLink: "https://www.thegreatcoursesplus.com/english-grammar-boot-camp",
} as const satisfies GreatCourse
