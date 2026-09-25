import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatWorksOfSacredMusic = {
  id: "019db533-f3a0-724f-a087-c41ab912999b",
  type: "page-type/great-course",
  slug: "the-great-works-of-sacred-music",
  title: "The Great Works of Sacred Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 708.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-works-of-sacred-music",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-works-of-sacred-music",
    },
  ],
} as const satisfies GreatCourse
