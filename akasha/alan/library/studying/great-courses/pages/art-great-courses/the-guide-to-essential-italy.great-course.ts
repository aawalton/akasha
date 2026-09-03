import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGuideToEssentialItaly = {
  id: "019db533-f39f-7c09-a8d4-02717b8433cd",
  pageTypeSlug: "great-course",
  slug: "the-guide-to-essential-italy",
  title: "The Guide to Essential Italy",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 1080,
  ownProgress: 1080,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "history-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-guide-to-essential-italy-the-great-courses-plus",
  externalLink:
    "https://www.thegreatcoursesplus.com/the-guide-to-essential-italy-the-great-courses-plus",
} as const satisfies GreatCourse
