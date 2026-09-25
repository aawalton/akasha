import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursIrelandAndNorthernIreland = {
  id: "019db533-f39f-716a-9dd0-4e9c14842060",
  type: "page-type/great-course",
  slug: "the-great-tours-ireland-and-northern-ireland",
  title: "The Great Tours: Ireland and Northern Ireland",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 753.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-ireland-and-northern-ireland",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-tours-ireland-and-northern-ireland",
    },
  ],
} as const satisfies GreatCourse
