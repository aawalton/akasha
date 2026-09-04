import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatArtistsOfTheItalianRenaissance = {
  id: "019db533-f39f-76ec-bab0-614a1a59d973",
  pageTypeSlug: "great-course",
  slug: "great-artists-of-the-italian-renaissance",
  title: "Great Artists of the Italian Renaissance",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 1092,
  ownProgress: 1092,
  partOfSlugs: ["all-great-courses", "art-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "great-artists-of-the-italian-renaissance",
  externalLink: "https://www.thegreatcoursesplus.com/great-artists-of-the-italian-renaissance",
} as const satisfies GreatCourse
