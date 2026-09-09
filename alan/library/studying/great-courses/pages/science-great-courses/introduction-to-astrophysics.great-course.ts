import type { GreatCourse } from "../../great-course.page-type.ts"

export const introductionToAstrophysics = {
  id: "019db533-f39e-7f4d-ac81-921a7828df8f",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "introduction-to-astrophysics",
  title: "Introduction to Astrophysics",
  status: "not-started",
  unit: "minutes",
  ownLength: 790.8,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "introduction-to-astrophysics",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-astrophysics",
} as const satisfies GreatCourse
