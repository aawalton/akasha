import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mayaToAztecAncientMesoamericaRevealed = {
  id: "019db533-f3a0-70dc-b20e-83be408e8d92",
  type: "page-type/great-course",
  slug: "maya-to-aztec-ancient-mesoamerica-revealed",
  title: "Maya to Aztec: Ancient Mesoamerica Revealed",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1464,
  ownProgress: 1464,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "maya-to-aztec-ancient-mesoamerica-revealed",
      externalLink:
        "https://www.thegreatcoursesplus.com/maya-to-aztec-ancient-mesoamerica-revealed",
    },
  ],
} as const satisfies GreatCourse
