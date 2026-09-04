import type { GreatCourse } from "../../great-course.page-type.ts"

export const theArtOfTravelPhotography = {
  id: "019db533-f39f-746e-ab09-27ab782c574d",
  pageTypeSlug: "great-course",
  slug: "the-art-of-travel-photography",
  title: "The Art of Travel Photography",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 165,
  ownProgress: 165,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-art-of-travel-photography",
  externalLink: "https://www.thegreatcoursesplus.com/the-art-of-travel-photography",
} as const satisfies GreatCourse
