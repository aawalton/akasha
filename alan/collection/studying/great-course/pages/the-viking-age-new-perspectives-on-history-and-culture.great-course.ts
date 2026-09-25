import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theVikingAgeNewPerspectivesOnHistoryAndCulture = {
  id: "019db533-f3a0-705c-a308-eae03d9a41ca",
  type: "page-type/great-course",
  slug: "the-viking-age-new-perspectives-on-history-and-culture",
  title: "The Viking Age: New Perspectives on History and Culture",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 402,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-viking-age-new-perspectives-on-history-and-culture",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-viking-age-new-perspectives-on-history-and-culture",
    },
  ],
} as const satisfies GreatCourse
