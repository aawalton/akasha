import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const propagandaAndPersuasion = {
  id: "019db533-f39e-759b-be93-9e7fed581fa5",
  type: "page-type/great-course",
  slug: "propaganda-and-persuasion",
  title: "Propaganda and Persuasion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 373.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "propaganda-and-persuasion",
      externalLink: "https://www.thegreatcoursesplus.com/propaganda-and-persuasion",
    },
  ],
} as const satisfies GreatCourse
