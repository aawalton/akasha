import type { GreatCourse } from "../../great-course.page-type.ts"

export const dogTraining101 = {
  id: "019db533-f39e-7717-a391-e00c4cc908aa",
  pageTypeSlug: "great-course",
  slug: "dog-training-101",
  title: "Dog Training 101",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 755.4,
  ownProgress: 755.4,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "dog-training-101",
  externalLink: "https://www.thegreatcoursesplus.com/dog-training-101",
} as const satisfies GreatCourse
