import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureUnderwaterArchaeologyTheNorthAmericanGreatLakes = {
  id: "019db533-f39e-7c4c-b283-8e1c6589615c",
  type: "page-type/great-course",
  slug: "pilot-lecture-underwater-archaeology-the-north-american-great-lakes",
  title: "Pilot Lecture: Underwater Archaeology - The North American Great Lakes",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 25.2,
  ownProgress: 25.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-underwater-archaeology-the-north-american-great-lakes",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-underwater-archaeology-the-north-american-great-lakes",
    },
  ],
} as const satisfies GreatCourse
