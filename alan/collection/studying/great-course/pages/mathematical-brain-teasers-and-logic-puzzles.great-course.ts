import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mathematicalBrainTeasersAndLogicPuzzles = {
  id: "019db533-f3a0-72b2-b884-9bcc52d40065",
  type: "page-type/great-course",
  slug: "mathematical-brain-teasers-and-logic-puzzles",
  title: "Mathematical Brain Teasers and Logic Puzzles",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 309,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mathematical-brain-teasers-and-logic-puzzles",
      externalLink:
        "https://www.thegreatcoursesplus.com/mathematical-brain-teasers-and-logic-puzzles",
    },
  ],
} as const satisfies GreatCourse
