import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theNationalGeographicGuideToBirdingInNorthAmerica = {
  id: "019db533-f39e-7d95-86e8-781b3410b371",
  type: "page-type/great-course",
  slug: "the-national-geographic-guide-to-birding-in-north-america",
  title: "The National Geographic Guide to Birding in North America",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 751.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-national-geographic-guide-to-birding-in-north-america",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-national-geographic-guide-to-birding-in-north-america",
    },
  ],
} as const satisfies GreatCourse
