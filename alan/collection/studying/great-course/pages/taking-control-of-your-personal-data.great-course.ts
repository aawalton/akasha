import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const takingControlOfYourPersonalData = {
  id: "019db533-f39e-7516-9877-7ca69c6b2596",
  type: "page-type/great-course",
  slug: "taking-control-of-your-personal-data",
  title: "Taking Control of Your Personal Data",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 313.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "taking-control-of-your-personal-data",
      externalLink: "https://www.thegreatcoursesplus.com/taking-control-of-your-personal-data",
    },
  ],
} as const satisfies GreatCourse
