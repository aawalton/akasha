import type { GreatCourse } from "../great-course.page-type.types.ts"

export const illustratedNatureJournaling = {
  id: "019db533-f39f-762a-b341-7d91b125f919",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "illustrated-nature-journaling",
  title: "Illustrated Nature Journaling",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 137.4,
  ownProgress: 137.4,
  partOfCollections: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "illustrated-nature-journaling",
  externalLink: "https://www.thegreatcoursesplus.com/illustrated-nature-journaling",
} as const satisfies GreatCourse
