import type { GreatCourse } from "../../great-course.page-type.ts"

export const chemistry2ndEdition = {
  id: "019db533-f39f-70f4-8ba8-328d7b2bd75d",
  pageTypeSlug: "great-course",
  slug: "chemistry-2nd-edition",
  title: "Chemistry, 2nd Edition",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "chemistry-2nd-edition",
  externalLink: "https://www.thegreatcoursesplus.com/chemistry-2nd-edition",
} as const satisfies GreatCourse
