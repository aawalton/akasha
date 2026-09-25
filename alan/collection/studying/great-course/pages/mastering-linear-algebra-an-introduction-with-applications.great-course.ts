import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masteringLinearAlgebraAnIntroductionWithApplications = {
  id: "019db533-f3a0-72b8-813f-c5b80915a220",
  type: "page-type/great-course",
  slug: "mastering-linear-algebra-an-introduction-with-applications",
  title: "Mastering Linear Algebra: An Introduction with Applications",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mastering-linear-algebra-an-introduction-to-applications",
      externalLink:
        "https://www.thegreatcoursesplus.com/mastering-linear-algebra-an-introduction-to-applications",
    },
  ],
} as const satisfies GreatCourse
