import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicalArchaeologyOfAncientGreeceAndRome = {
  id: "01a06578-6717-7003-a9a8-b0947c6cd3e0",
  type: "page-type/great-course",
  slug: "classical-archaeology-of-ancient-greece-and-rome",
  title: "Classical Archaeology of Ancient Greece and Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classical-archaeology-of-ancient-greece-and-rome",
      externalLink:
        "https://plus.thegreatcourses.com/classical-archaeology-of-ancient-greece-and-rome",
    },
  ],
} as const satisfies GreatCourse
