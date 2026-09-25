import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const changeAndMotionCalculusMadeClear2ndEdition = {
  id: "019db533-f3a0-79ae-a619-9b68dc77a9bd",
  type: "page-type/great-course",
  slug: "change-and-motion-calculus-made-clear-2nd-edition",
  title: "Change and Motion: Calculus Made Clear, 2nd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 750,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "change-and-motion-calculus-made-clear-2nd-edition",
      externalLink:
        "https://www.thegreatcoursesplus.com/change-and-motion-calculus-made-clear-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
