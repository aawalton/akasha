import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ordinaryAmericansInTheRevolution = {
  id: "019db533-f3a0-70c2-9ca6-b0c85d86ed14",
  type: "page-type/great-course",
  slug: "ordinary-americans-in-the-revolution",
  title: "Ordinary Americans in the Revolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 702,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ordinary-americans-in-the-revolution",
      externalLink: "https://www.thegreatcoursesplus.com/ordinary-americans-in-the-revolution",
    },
  ],
} as const satisfies GreatCourse
