import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const flavorComesFirstHealthyMealsThatTasteDelicious = {
  id: "019db533-f398-73e3-a9e9-e8a7c1cdf276",
  type: "page-type/great-course",
  slug: "flavor-comes-first-healthy-meals-that-taste-delicious",
  title: "Flavor Comes First: Healthy Meals That Taste Delicious",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 123,
  ownProgress: 123,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "flavor-comes-first-healthy-meals-that-taste-delicious",
      externalLink:
        "https://www.thegreatcoursesplus.com/flavor-comes-first-healthy-meals-that-taste-delicious",
    },
  ],
} as const satisfies GreatCourse
