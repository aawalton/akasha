import type { Author } from "../author.page-type.ts"

export const johnGottman = {
  id: "01a06807-f091-701c-9b44-c72bb0c8bcff",
  pageTypeSlug: "author",
  slug: "john-gottman",
  title: "John Gottman",
  partOfCollections: ["non-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "in-progress",
  rank: "A",
} as const satisfies Author
