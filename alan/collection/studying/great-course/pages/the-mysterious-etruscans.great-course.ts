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
      externalLink: "https://plus.thegreatcourses.com/the-mysterious-etruscans",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
