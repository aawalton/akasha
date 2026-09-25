import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const academyOfHopeTakingOnAmericaSAdultEducationProblem = {
  id: "019db533-f39e-751e-9906-dfe0bbb55d20",
  type: "page-type/great-course",
  slug: "academy-of-hope-taking-on-america-s-adult-education-problem",
  title: "Academy of Hope: Taking On America’s Adult Education Problem",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 39,
  ownProgress: 39,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "academy-of-hope-taking-on-america-s-adult-education-problem",
      externalLink:
        "https://www.thegreatcoursesplus.com/academy-of-hope-taking-on-america-s-adult-education-problem",
    },
  ],
} as const satisfies GreatCourse
