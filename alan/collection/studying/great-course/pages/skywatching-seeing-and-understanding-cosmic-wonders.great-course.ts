import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const skywatchingSeeingAndUnderstandingCosmicWonders = {
  id: "019db533-f39f-71c0-a90a-49b5260a12fe",
  type: "page-type/great-course",
  slug: "skywatching-seeing-and-understanding-cosmic-wonders",
  title: "Skywatching: Seeing and Understanding Cosmic Wonders",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 564.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "skywatching-seeing-and-understanding-cosmic-wonders",
      externalLink:
        "https://www.thegreatcoursesplus.com/skywatching-seeing-and-understanding-cosmic-wonders",
    },
  ],
} as const satisfies GreatCourse
