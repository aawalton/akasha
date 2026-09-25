import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const oceanographyExploringEarthSFinalWilderness = {
  id: "019db533-f39f-7154-be65-1879ae205b1d",
  type: "page-type/great-course",
  slug: "oceanography-exploring-earth-s-final-wilderness",
  title: "Oceanography: Exploring Earth's Final Wilderness",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1158.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "oceanography-exploring-earths-final-wilderness",
      externalLink:
        "https://www.thegreatcoursesplus.com/oceanography-exploring-earths-final-wilderness",
    },
  ],
} as const satisfies GreatCourse
