import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theClassicalLegacyAncientGreeceAndRome = {
  id: "01a06578-6718-7002-910b-3ee7f071bd48",
  type: "page-type/great-course",
  slug: "the-classical-legacy-ancient-greece-and-rome",
  title: "The Classical Legacy: Ancient Greece and Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-classical-legacy-ancient-greece-and-rome-3143",
      externalLink:
        "https://plus.thegreatcourses.com/the-classical-legacy-ancient-greece-and-rome-3143",
    },
  ],
} as const satisfies GreatCourse
