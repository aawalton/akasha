import type { GreatCourse } from "../../great-course.page-type.ts"

export const howWeLearn = {
  id: "019db533-f39e-7e4e-96cb-f3342ab10cc6",
  pageTypeSlug: "great-course",
  slug: "how-we-learn",
  title: "How We Learn",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 702.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-we-learn",
  externalLink: "https://www.thegreatcoursesplus.com/how-we-learn",
} as const satisfies GreatCourse
