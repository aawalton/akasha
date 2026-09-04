import type { Author } from "../author.page-type.ts"

export const anneMccaffrey = {
  id: "01a06807-f090-7003-901f-8629ad273fa6",
  pageTypeSlug: "author",
  slug: "anne-mccaffrey",
  title: "Anne McCaffrey",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  externalLink: "https://en.wikipedia.org/wiki/Anne_McCaffrey",
} as const satisfies Author
