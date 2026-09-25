import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whenEverythingFailsSurvivingAnyDisaster = {
  id: "019db533-f39e-76ac-8ea3-bee7930dd311",
  type: "page-type/great-course",
  slug: "when-everything-fails-surviving-any-disaster",
  title: "When Everything Fails: Surviving Any Disaster",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 446.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "when-everything-fails-surviving-any-disaster",
      externalLink:
        "https://www.thegreatcoursesplus.com/when-everything-fails-surviving-any-disaster",
    },
  ],
} as const satisfies GreatCourse
