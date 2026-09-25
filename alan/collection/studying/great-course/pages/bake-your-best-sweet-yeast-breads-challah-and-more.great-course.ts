import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bakeYourBestSweetYeastBreadsChallahAndMore = {
  id: "019db533-f398-73c9-ad72-2a13b1763838",
  type: "page-type/great-course",
  slug: "bake-your-best-sweet-yeast-breads-challah-and-more",
  title: "Bake Your Best: Sweet Yeast Breads, Challah & More",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 135.6,
  ownProgress: 135.6,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "bake-your-best-sweet-yeast-breads-challah-more",
      externalLink:
        "https://www.thegreatcoursesplus.com/bake-your-best-sweet-yeast-breads-challah-more",
    },
  ],
} as const satisfies GreatCourse
