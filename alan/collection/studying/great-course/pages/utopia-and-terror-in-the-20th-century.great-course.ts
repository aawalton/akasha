import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const utopiaAndTerrorInThe20thCentury = {
  id: "019db533-f39f-7832-afe7-2fdab420b03f",
  type: "page-type/great-course",
  slug: "utopia-and-terror-in-the-20th-century",
  title: "Utopia and Terror in the 20th Century",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 746.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "utopia-and-terror-in-the-20th-century",
      externalLink: "https://www.thegreatcoursesplus.com/utopia-and-terror-in-the-20th-century",
    },
  ],
} as const satisfies GreatCourse
