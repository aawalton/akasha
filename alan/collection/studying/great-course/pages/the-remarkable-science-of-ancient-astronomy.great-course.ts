import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRemarkableScienceOfAncientAstronomy = {
  id: "019db533-f3a0-703a-a4ad-9c48d9f4ffc8",
  type: "page-type/great-course",
  slug: "the-remarkable-science-of-ancient-astronomy",
  title: "The Remarkable Science of Ancient Astronomy",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 715.8,
  ownProgress: 715.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-remarkable-science-of-ancient-astronomy",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-remarkable-science-of-ancient-astronomy",
    },
  ],
} as const satisfies GreatCourse
