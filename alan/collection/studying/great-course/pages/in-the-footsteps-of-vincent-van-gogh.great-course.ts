import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const inTheFootstepsOfVincentVanGogh = {
  id: "019db533-f39f-752c-9e96-6aa33959def4",
  type: "page-type/great-course",
  slug: "in-the-footsteps-of-vincent-van-gogh",
  title: "In the Footsteps of Vincent van Gogh",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 339.6,
  ownProgress: 339.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "in-the-footsteps-of-vincent-van-gogh",
      externalLink: "https://plus.thegreatcourses.com/in-the-footsteps-of-vincent-van-gogh",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
