import type { GreatCourse } from "../../great-course.page-type.ts"

export const mindBodyPhilosophy = {
  id: "019db533-f3a0-773d-8070-2eab9a2cd090",
  pageTypeSlug: "great-course",
  slug: "mind-body-philosophy",
  title: "Mind-Body Philosophy",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 748.8,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "mind-body-philosophy",
  externalLink: "https://www.thegreatcoursesplus.com/mind-body-philosophy",
} as const satisfies GreatCourse
