import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const natureWatchingHowToFindAndObserveWildlife = {
  id: "019db533-f39e-7c72-b123-2c371c90fada",
  type: "page-type/great-course",
  slug: "nature-watching-how-to-find-and-observe-wildlife",
  title: "Nature Watching: How to Find and Observe Wildlife",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 417.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "nature-watching-how-to-find-and-observe-wildlife",
      externalLink:
        "https://www.thegreatcoursesplus.com/nature-watching-how-to-find-and-observe-wildlife",
    },
  ],
} as const satisfies GreatCourse
