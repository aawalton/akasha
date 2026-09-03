import type { GreatCourse } from "../../great-course.page-type.ts"

export const theHumanJourney = {
  id: "019db533-f39f-7174-af48-d870995467fe",
  pageTypeSlug: "great-course",
  slug: "the-human-journey",
  title: "The Human Journey",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 369.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-human-journey",
  externalLink: "https://www.thegreatcoursesplus.com/the-human-journey",
} as const satisfies GreatCourse
