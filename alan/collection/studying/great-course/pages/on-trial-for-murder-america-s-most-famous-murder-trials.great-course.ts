import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const onTrialForMurderAmericaSMostFamousMurderTrials = {
  id: "019db533-f39f-787d-88ce-58124484c223",
  type: "page-type/great-course",
  slug: "on-trial-for-murder-america-s-most-famous-murder-trials",
  title: "On Trial for Murder: America’s Most Famous Murder Trials",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 308.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "on-trial-for-murder-america-s-most-famous-murder-trials",
      externalLink:
        "https://www.thegreatcoursesplus.com/on-trial-for-murder-america-s-most-famous-murder-trials",
    },
  ],
} as const satisfies GreatCourse
