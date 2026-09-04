import type { GreatCourse } from "../../great-course.page-type.ts"

export const introductionToPaleontology = {
  id: "019db533-f39f-72be-9282-c6fced567180",
  pageTypeSlug: "great-course",
  slug: "introduction-to-paleontology",
  title: "Introduction to Paleontology",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 754.8,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "introduction-to-paleontology",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-paleontology",
} as const satisfies GreatCourse
