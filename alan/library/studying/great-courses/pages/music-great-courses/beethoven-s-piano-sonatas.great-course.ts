import type { GreatCourse } from "../../great-course.page-type.ts"

export const beethovenSPianoSonatas = {
  id: "019db533-f3a0-75b4-906c-ce25e8c0d85d",
  pageTypeSlug: "great-course",
  slug: "beethoven-s-piano-sonatas",
  title: "Beethoven's Piano Sonatas",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 1098,
  ownProgress: 1098,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "beethovens-piano-sonatas",
  externalLink: "https://www.thegreatcoursesplus.com/beethovens-piano-sonatas",
} as const satisfies GreatCourse
