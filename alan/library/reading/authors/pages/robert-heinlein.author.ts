import type { Author } from "../author.page-type.types.ts"

export const robertHeinlein = {
  id: "01a06807-f091-7027-8d18-ab2da0936b58",
  pageTypeSlug: "author",
  type: "author",
  slug: "robert-heinlein",
  title: "Robert Heinlein",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
