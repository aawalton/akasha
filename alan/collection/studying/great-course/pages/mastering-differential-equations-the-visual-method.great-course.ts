import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masteringDifferentialEquationsTheVisualMethod = {
  id: "019db533-f3a0-77f1-86c2-e2136991d5e4",
  type: "page-type/great-course",
  slug: "mastering-differential-equations-the-visual-method",
  title: "Mastering Differential Equations: The Visual Method",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 751.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mastering-differential-equations-the-visual-method",
      externalLink:
        "https://www.thegreatcoursesplus.com/mastering-differential-equations-the-visual-method",
    },
  ],
} as const satisfies GreatCourse
