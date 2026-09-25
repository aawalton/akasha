import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theNationalGeographicGuideToLandscapeAndWildlifePhotography = {
  id: "019db533-f39f-73bb-97bc-3ea8ed675127",
  type: "page-type/great-course",
  slug: "the-national-geographic-guide-to-landscape-and-wildlife-photography",
  title: "The National Geographic Guide to Landscape and Wildlife Photography",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 721.2,
  ownProgress: 721.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-national-geographic-guide-to-landscape-and-wildlife-photography",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-national-geographic-guide-to-landscape-and-wildlife-photography",
    },
  ],
} as const satisfies GreatCourse
