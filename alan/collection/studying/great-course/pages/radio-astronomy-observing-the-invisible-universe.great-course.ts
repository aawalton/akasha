import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const radioAstronomyObservingTheInvisibleUniverse = {
  id: "019db533-f39e-7e83-85e5-aaeb2f0ce87d",
  type: "page-type/great-course",
  slug: "radio-astronomy-observing-the-invisible-universe",
  title: "Radio Astronomy: Observing the Invisible Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 761.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "radio-astronomy-observing-the-invisible-universe",
      externalLink:
        "https://www.thegreatcoursesplus.com/radio-astronomy-observing-the-invisible-universe",
    },
  ],
} as const satisfies GreatCourse
