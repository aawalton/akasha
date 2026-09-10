import type { Author } from "../author.page-type.types.ts"

export const danSimmons = {
  id: "01a06807-f091-7006-8c56-73887f171e9d",
  pageTypeSlug: "author",
  type: "author",
  slug: "dan-simmons",
  title: "Dan Simmons",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
