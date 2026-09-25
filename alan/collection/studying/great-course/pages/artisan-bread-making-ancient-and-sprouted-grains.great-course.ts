import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const artisanBreadMakingAncientAndSproutedGrains = {
  id: "019db533-f398-73d2-b13e-8ad42476e326",
  type: "page-type/great-course",
  slug: "artisan-bread-making-ancient-and-sprouted-grains",
  title: "Artisan Bread Making: Ancient & Sprouted Grains",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 147,
  ownProgress: 147,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "artisan-bread-making-ancient-sprouted-grains",
      externalLink:
        "https://www.thegreatcoursesplus.com/artisan-bread-making-ancient-sprouted-grains",
    },
  ],
} as const satisfies GreatCourse
