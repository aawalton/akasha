import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMysteriousEtruscans = {
  id: "019db533-f39f-7785-95f6-b48e0a267d75",
  type: "page-type/great-course",
  slug: "the-mysterious-etruscans",
  title: "The Mysterious Etruscans",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 759,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mysterious-etruscans",
      externalLink: "https://www.thegreatcoursesplus.com/the-mysterious-etruscans",
    },
  ],
} as const satisfies GreatCourse
