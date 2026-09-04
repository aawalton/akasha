import type { GreatCourse } from "../../great-course.page-type.ts"

export const storiesOfAmericaSNationalParks = {
  id: "019db533-f39f-7464-b20c-30467266584f",
  pageTypeSlug: "great-course",
  slug: "stories-of-america-s-national-parks",
  title: "Stories of America’s National Parks",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 355.2,
  ownProgress: 355.2,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "stories-of-america-s-national-parks",
  externalLink: "https://www.thegreatcoursesplus.com/stories-of-america-s-national-parks",
} as const satisfies GreatCourse
