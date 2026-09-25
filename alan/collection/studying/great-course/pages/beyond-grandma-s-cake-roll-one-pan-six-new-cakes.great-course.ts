import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const beyondGrandmaSCakeRollOnePanSixNewCakes = {
  id: "019db533-f39f-7b7e-9093-ec7389f53970",
  type: "page-type/great-course",
  slug: "beyond-grandma-s-cake-roll-one-pan-six-new-cakes",
  title: "Beyond Grandma's Cake Roll: One Pan, Six New Cakes",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 157.8,
  ownProgress: 157.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "beyond-grandma-s-cake-roll-one-pan-six-new-cakes",
      externalLink:
        "https://www.thegreatcoursesplus.com/beyond-grandma-s-cake-roll-one-pan-six-new-cakes",
    },
  ],
} as const satisfies GreatCourse
