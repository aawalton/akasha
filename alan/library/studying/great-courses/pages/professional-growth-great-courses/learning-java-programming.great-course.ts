import type { GreatCourse } from "../../great-course.page-type.ts"

export const learningJavaProgramming = {
  id: "019db533-f39e-72b0-b9f1-d46d93939b61",
  pageTypeSlug: "great-course",
  slug: "learning-java-programming",
  title: "Learning Java Programming",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 505.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "professional-growth-great-courses"],
  source: "the-great-courses",
  externalId: "learning-java-programming",
  externalLink: "https://www.thegreatcoursesplus.com/learning-java-programming",
} as const satisfies GreatCourse
