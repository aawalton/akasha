import type { GreatCourse } from "../../great-course.page-type.ts"

export const storyOfTheBible = {
  id: "019db533-f39e-7a75-8921-e85bf279095f",
  pageTypeSlug: "great-course",
  slug: "story-of-the-bible",
  title: "Story of the Bible",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "story-of-the-bible",
  externalLink: "https://www.thegreatcoursesplus.com/story-of-the-bible",
} as const satisfies GreatCourse
