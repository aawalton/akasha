import type { Author } from "../author.page-type.types.ts"

export const johnTaylor = {
  id: "01a06807-f091-701d-9861-ef041272e3d4",
  pageTypeSlug: "author",
  type: "author",
  slug: "john-taylor",
  title: "John Taylor",
  partOfCollections: ["prophets"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
