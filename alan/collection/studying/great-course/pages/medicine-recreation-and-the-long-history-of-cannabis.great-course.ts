import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const medicineRecreationAndTheLongHistoryOfCannabis = {
  id: "01a06578-6718-7000-b2e1-c24bbb78fd13",
  type: "page-type/great-course",
  slug: "medicine-recreation-and-the-long-history-of-cannabis",
  title: "Medicine, Recreation, and the Long History of Cannabis",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "medicine-recreation-and-the-long-history-of-cannabis",
      externalLink:
        "https://plus.thegreatcourses.com/medicine-recreation-and-the-long-history-of-cannabis",
    },
  ],
} as const satisfies GreatCourse
