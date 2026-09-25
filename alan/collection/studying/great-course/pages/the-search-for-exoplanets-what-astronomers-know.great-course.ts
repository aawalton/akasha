import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSearchForExoplanetsWhatAstronomersKnow = {
  id: "019db533-f39e-7d75-b9d3-dd50beb927ed",
  type: "page-type/great-course",
  slug: "the-search-for-exoplanets-what-astronomers-know",
  title: "The Search for Exoplanets: What Astronomers Know",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-search-for-exoplanets-what-astronomers-know",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-search-for-exoplanets-what-astronomers-know",
    },
  ],
} as const satisfies GreatCourse
