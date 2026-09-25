import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToListenToAndUnderstandGreatMusic3rdEdition = {
  id: "019db533-f3a0-7440-8a68-b677fa79c605",
  type: "page-type/great-course",
  slug: "how-to-listen-to-and-understand-great-music-3rd-edition",
  title: "How to Listen to and Understand Great Music, 3rd Edition",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 2190,
  ownProgress: 91.25,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-listen-to-and-understand-great-music-3rd-edition",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-to-listen-to-and-understand-great-music-3rd-edition",
    },
  ],
} as const satisfies GreatCourse
