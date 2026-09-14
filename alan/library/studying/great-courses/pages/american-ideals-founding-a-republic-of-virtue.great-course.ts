import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const americanIdealsFoundingARepublicOfVirtue = {
  id: "019db533-f3a0-7192-a12c-5069d7c3e0b6",
  type: "great-course",
  slug: "american-ideals-founding-a-republic-of-virtue",
  title: 'American Ideals: Founding a "Republic of Virtue"',
  status: "completed",
  rank: "C",
  unit: "unit/minutes",
  ownLength: 363.6,
  ownProgress: 363.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "american-ideals-founding-a-republic-of-virtue",
      externalLink:
        "https://www.thegreatcoursesplus.com/american-ideals-founding-a-republic-of-virtue",
    },
  ],
} as const satisfies GreatCourse
