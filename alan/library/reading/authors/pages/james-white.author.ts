import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const jamesWhite = {
  id: "01a06807-f091-7019-b748-4b625ff43a47",
  type: "author",
  slug: "james-white",
  title: "James White",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
