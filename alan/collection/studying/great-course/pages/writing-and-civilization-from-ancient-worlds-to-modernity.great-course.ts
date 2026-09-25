import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const writingAndCivilizationFromAncientWorldsToModernity = {
  id: "019db533-f39e-77ea-ab4a-10064a540af2",
  type: "page-type/great-course",
  slug: "writing-and-civilization-from-ancient-worlds-to-modernity",
  title: "Writing and Civilization: From Ancient Worlds to Modernity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 728.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "writing-and-civilization-from-ancient-worlds-to-modernity",
      externalLink:
        "https://www.thegreatcoursesplus.com/writing-and-civilization-from-ancient-worlds-to-modernity",
    },
  ],
} as const satisfies GreatCourse
