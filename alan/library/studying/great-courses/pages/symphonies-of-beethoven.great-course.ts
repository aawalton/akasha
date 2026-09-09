import type { GreatCourse } from "../great-course.page-type.ts"

export const symphoniesOfBeethoven = {
  id: "019db533-f3a0-72a4-9c55-038625a36112",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "symphonies-of-beethoven",
  title: "Symphonies of Beethoven",
  status: "not-started",
  unit: "minutes",
  ownLength: 1460.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "symphonies-of-beethoven",
  externalLink: "https://www.thegreatcoursesplus.com/symphonies-of-beethoven",
} as const satisfies GreatCourse
