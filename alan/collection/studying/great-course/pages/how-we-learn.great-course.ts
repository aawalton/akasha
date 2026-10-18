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
      externalLink: "https://plus.thegreatcourses.com/how-we-learn",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
