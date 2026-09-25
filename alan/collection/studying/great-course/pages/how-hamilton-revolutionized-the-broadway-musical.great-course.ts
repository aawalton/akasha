import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howHamiltonRevolutionizedTheBroadwayMusical = {
  id: "019db533-f3a0-7350-bd3e-dfcf0b7f536a",
  type: "page-type/great-course",
  slug: "how-hamilton-revolutionized-the-broadway-musical",
  title: "How Hamilton Revolutionized the Broadway Musical",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 12.6,
  ownProgress: 12.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-hamilton-revolutionized-the-broadway-musical",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-hamilton-revolutionized-the-broadway-musical",
    },
  ],
} as const satisfies GreatCourse
