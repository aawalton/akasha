import type { GreatCourse } from "../great-course.page-type.ts"

export const lawSchoolForEveryone = {
  id: "019db533-f39e-7a55-8120-72daf4ecbe04",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "law-school-for-everyone",
  title: "Law School for Everyone",
  status: "not-started",
  unit: "minutes",
  ownLength: 1522.2,
  ownProgress: 0,
  partOfCollections: [
    "all-great-courses",
    "business-and-finance-great-courses",
    "learning-paths-great-courses",
    "professional-growth-great-courses",
  ],
  source: "the-great-courses",
  externalId: "law-school-for-everyone",
  externalLink: "https://www.thegreatcoursesplus.com/law-school-for-everyone",
} as const satisfies GreatCourse
