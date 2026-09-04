import type { GreatCourse } from "../../great-course.page-type.ts"

export const danteSDivineComedy = {
  id: "019db533-f39e-79bd-8a93-288adcdf5817",
  pageTypeSlug: "great-course",
  slug: "dante-s-divine-comedy",
  title: "Dante's Divine Comedy",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "dantes-divine-comedy",
  externalLink: "https://www.thegreatcoursesplus.com/dantes-divine-comedy",
} as const satisfies GreatCourse
