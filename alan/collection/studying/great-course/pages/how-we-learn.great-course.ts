import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howWeLearn = {
  id: "019db533-f39e-7e4e-96cb-f3342ab10cc6",
  type: "page-type/great-course",
  slug: "how-we-learn",
  title: "How We Learn",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 702.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-we-learn",
      externalLink: "https://www.thegreatcoursesplus.com/how-we-learn",
    },
  ],
} as const satisfies GreatCourse
