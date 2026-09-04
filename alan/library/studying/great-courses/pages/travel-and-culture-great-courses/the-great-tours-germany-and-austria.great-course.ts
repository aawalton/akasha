import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursGermanyAndAustria = {
  id: "019db533-f39f-743a-b809-30778916c3f3",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-germany-and-austria",
  title: "The Great Tours: Germany and Austria",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 699.6,
  ownProgress: 699.6,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-germany-and-austria",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-germany-and-austria",
} as const satisfies GreatCourse
