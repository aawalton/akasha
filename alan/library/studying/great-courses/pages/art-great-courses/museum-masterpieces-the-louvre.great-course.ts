import type { GreatCourse } from "../../great-course.page-type.ts"

export const museumMasterpiecesTheLouvre = {
  id: "019db533-f39f-7542-b179-3555e41c6f1f",
  pageTypeSlug: "great-course",
  slug: "museum-masterpieces-the-louvre",
  title: "Museum Masterpieces: The Louvre",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 382.8,
  ownProgress: 382.8,
  partOfSlugs: ["all-great-courses", "art-great-courses"],
  source: "the-great-courses",
  externalId: "museum-masterpieces-the-louvre",
  externalLink: "https://www.thegreatcoursesplus.com/museum-masterpieces-the-louvre",
} as const satisfies GreatCourse
