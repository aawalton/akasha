import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const creativeFlavorsForCakesFillingsAndFrostings = {
  id: "019db533-f39f-7a28-81a1-a505fee15bcb",
  type: "page-type/great-course",
  slug: "creative-flavors-for-cakes-fillings-and-frostings",
  title: "Creative Flavors for Cakes, Fillings & Frostings",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 213,
  ownProgress: 213,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "creative-flavors-for-cakes-fillings-frostings",
      externalLink:
        "https://www.thegreatcoursesplus.com/creative-flavors-for-cakes-fillings-frostings",
    },
  ],
} as const satisfies GreatCourse
