import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const jewelryDesignForBeadArtists = {
  id: "019db533-f39f-78bd-aa48-64eca9923eac",
  type: "page-type/great-course",
  slug: "jewelry-design-for-bead-artists",
  title: "Jewelry Design for Bead Artists",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 124.8,
  ownProgress: 124.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "jewelry-design-for-bead-artists",
      externalLink: "https://www.thegreatcoursesplus.com/jewelry-design-for-bead-artists",
    },
  ],
} as const satisfies GreatCourse
