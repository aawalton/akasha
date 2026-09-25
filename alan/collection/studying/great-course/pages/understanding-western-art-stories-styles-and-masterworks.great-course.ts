import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingWesternArtStoriesStylesAndMasterworks = {
  id: "019db533-f38a-755c-9b4e-aa52cfeed23f",
  type: "page-type/great-course",
  slug: "understanding-western-art-stories-styles-and-masterworks",
  title: "Understanding Western Art: Stories, Styles, and Masterworks",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 800.933333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-western-art-stories-styles-and-masterworks",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-western-art-stories-styles-and-masterworks",
    },
  ],
} as const satisfies GreatCourse
