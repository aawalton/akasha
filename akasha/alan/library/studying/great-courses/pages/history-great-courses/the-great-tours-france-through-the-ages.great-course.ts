import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursFranceThroughTheAges = {
  id: "019db533-f39f-7cb0-8446-a2be4478088d",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-france-through-the-ages",
  title: "The Great Tours: France through the Ages",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 724.2,
  ownProgress: 724.2,
  partOfSlugs: ["all-great-courses", "history-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-france-through-the-ages",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-france-through-the-ages",
} as const satisfies GreatCourse
