import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masterpiecesOfAncientGreekLiterature = {
  id: "019db533-f388-707a-be68-562edc6a8b6f",
  type: "page-type/great-course",
  slug: "masterpieces-of-ancient-greek-literature",
  title: "Masterpieces of Ancient Greek Literature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1105.133333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "masterpieces-of-ancient-greek-literature",
      externalLink: "https://www.thegreatcoursesplus.com/masterpieces-of-ancient-greek-literature",
    },
  ],
} as const satisfies GreatCourse
