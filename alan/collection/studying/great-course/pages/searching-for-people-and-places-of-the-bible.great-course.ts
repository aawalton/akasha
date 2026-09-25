import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const searchingForPeopleAndPlacesOfTheBible = {
  id: "019db533-f39e-7a7d-ad8f-a9bb31699fa0",
  type: "page-type/great-course",
  slug: "searching-for-people-and-places-of-the-bible",
  title: "Searching for People and Places of the Bible",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 480,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "searching-for-people-and-places-of-the-bible",
      externalLink:
        "https://www.thegreatcoursesplus.com/searching-for-people-and-places-of-the-bible",
    },
  ],
} as const satisfies GreatCourse
