import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thermodynamicsFourLawsThatMoveTheUniverse = {
  id: "019db533-f39f-7189-9999-88e498fdb31f",
  type: "page-type/great-course",
  slug: "thermodynamics-four-laws-that-move-the-universe",
  title: "Thermodynamics: Four Laws That Move the Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 756,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "thermodynamics-four-laws-that-move-the-universe",
      externalLink:
        "https://www.thegreatcoursesplus.com/thermodynamics-four-laws-that-move-the-universe",
    },
  ],
} as const satisfies GreatCourse
