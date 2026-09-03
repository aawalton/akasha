import type { GreatCourse } from "../../great-course.page-type.ts"

export const inTheFootstepsOfVincentVanGogh = {
  id: "019db533-f39f-752c-9e96-6aa33959def4",
  pageTypeSlug: "great-course",
  slug: "in-the-footsteps-of-vincent-van-gogh",
  title: "In the Footsteps of Vincent van Gogh",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 339.6,
  ownProgress: 339.6,
  partOfSlugs: ["all-great-courses", "art-great-courses"],
  source: "the-great-courses",
  externalId: "in-the-footsteps-of-vincent-van-gogh",
  externalLink: "https://www.thegreatcoursesplus.com/in-the-footsteps-of-vincent-van-gogh",
} as const satisfies GreatCourse
