import type { Author } from "../author.page-type.ts"

export const elizabethMoon = {
  id: "01a06807-f091-700d-8cbe-5d617347ad60",
  pageTypeSlug: "author",
  slug: "elizabeth-moon",
  title: "Elizabeth Moon",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
