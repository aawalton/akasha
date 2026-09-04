import type { GreatCourse } from "../../great-course.page-type.ts"

export const americaSMusicalHeritage = {
  id: "019db533-f3a0-756a-aca4-8d58d6952e5b",
  pageTypeSlug: "great-course",
  slug: "america-s-musical-heritage",
  title: "America's Musical Heritage",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 355.2,
  ownProgress: 355.2,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "americas-musical-heritage",
  externalLink: "https://www.thegreatcoursesplus.com/americas-musical-heritage",
} as const satisfies GreatCourse
