import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursAGuidedTourOfAncientEgypt = {
  id: "019db533-f39f-77e7-864e-aae7f77f86ad",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-a-guided-tour-of-ancient-egypt",
  title: "The Great Tours: A Guided Tour of Ancient Egypt",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 695.4,
  ownProgress: 695.4,
  partOfSlugs: ["all-great-courses", "history-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-a-guided-tour-of-ancient-egypt",
  externalLink:
    "https://www.thegreatcoursesplus.com/the-great-tours-a-guided-tour-of-ancient-egypt",
} as const satisfies GreatCourse
