import type { Author } from "../author.page-type.ts"

export const thomasSMonson = {
  id: "01a06807-f091-702c-a90f-e6bf9e4c8286",
  pageTypeSlug: "author",
  type: "author",
  slug: "thomas-s-monson",
  title: "Thomas S. Monson",
  partOfCollections: ["prophets"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
