import type { GreatCourse } from "../../great-course.page-type.ts"

export const physicsInYourLife = {
  id: "019db533-f39f-7229-ac4f-ed5da009df44",
  pageTypeSlug: "great-course",
  slug: "physics-in-your-life",
  title: "Physics in Your Life",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1098,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "physics-in-your-life",
  externalLink: "https://www.thegreatcoursesplus.com/physics-in-your-life",
} as const satisfies GreatCourse
