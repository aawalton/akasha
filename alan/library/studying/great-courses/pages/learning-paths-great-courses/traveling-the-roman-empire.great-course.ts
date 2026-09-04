import type { GreatCourse } from "../../great-course.page-type.ts"

export const travelingTheRomanEmpire = {
  id: "019db533-f39f-7479-a811-2cf1b08bb53b",
  pageTypeSlug: "great-course",
  slug: "traveling-the-roman-empire",
  title: "Traveling The Roman Empire",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 290.4,
  ownProgress: 290.4,
  partOfSlugs: [
    "all-great-courses",
    "learning-paths-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "traveling-the-roman-empire",
  externalLink: "https://www.thegreatcoursesplus.com/traveling-the-roman-empire",
} as const satisfies GreatCourse
