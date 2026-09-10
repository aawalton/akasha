import type { GreatCourse } from "../great-course.page-type.types.ts"

export const learnInAWeekend = {
  id: "019db533-f39e-75da-b361-aaede5f59448",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "learn-in-a-weekend",
  title: "Learn in a Weekend",
  status: "not-started",
  unit: "minutes",
  ownLength: 305.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "learn-in-a-weekend",
  externalLink: "https://www.thegreatcoursesplus.com/learn-in-a-weekend",
} as const satisfies GreatCourse
