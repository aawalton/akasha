import type { GreatCourse } from "../../great-course.page-type.ts"

export const electricalEngineeringForEveryone = {
  id: "019db533-f39f-70aa-ba55-5785dc127596",
  pageTypeSlug: "great-course",
  slug: "electrical-engineering-for-everyone",
  title: "Electrical Engineering for Everyone",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 756.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "electrical-engineering-for-everyone",
  externalLink: "https://www.thegreatcoursesplus.com/electrical-engineering-for-everyone",
} as const satisfies GreatCourse
