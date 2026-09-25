import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const writtenCommunicationsBeingHeardAndUnderstood = {
  id: "019db533-f39e-77ac-b9d0-bbb3857d0ab5",
  type: "page-type/great-course",
  slug: "written-communications-being-heard-and-understood",
  title: "Written Communications: Being Heard and Understood",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 383.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "written-communications-being-heard-and-understood",
      externalLink:
        "https://www.thegreatcoursesplus.com/written-communications-being-heard-and-understood",
    },
  ],
} as const satisfies GreatCourse
