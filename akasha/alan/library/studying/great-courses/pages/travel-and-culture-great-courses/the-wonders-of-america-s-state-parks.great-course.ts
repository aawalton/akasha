import type { GreatCourse } from "../../great-course.page-type.ts"

export const theWondersOfAmericaSStateParks = {
  id: "019db533-f39f-73e5-b95d-4f87deb10c90",
  pageTypeSlug: "great-course",
  slug: "the-wonders-of-america-s-state-parks",
  title: "The Wonders of America's State Parks",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 634.8,
  ownProgress: 634.8,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-wonders-of-americas-state-parks",
  externalLink: "https://www.thegreatcoursesplus.com/the-wonders-of-americas-state-parks",
} as const satisfies GreatCourse
