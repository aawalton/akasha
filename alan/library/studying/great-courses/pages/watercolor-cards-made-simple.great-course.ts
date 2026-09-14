import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const watercolorCardsMadeSimple = {
  id: "019db533-f39f-779d-953d-06a17694fc72",
  type: "great-course",
  slug: "watercolor-cards-made-simple",
  title: "Watercolor Cards Made Simple",
  status: "completed",
  rank: "D",
  unit: "unit/minutes",
  ownLength: 166.2,
  ownProgress: 166.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "watercolor-cards-made-simple",
      externalLink: "https://www.thegreatcoursesplus.com/watercolor-cards-made-simple",
    },
  ],
} as const satisfies GreatCourse
