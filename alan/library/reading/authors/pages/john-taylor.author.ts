import type { Author } from "../author.page-type.ts"

export const johnTaylor = {
  id: "01a06807-f091-701d-9861-ef041272e3d4",
  pageTypeSlug: "author",
  slug: "john-taylor",
  title: "John Taylor",
  partOfSlugs: ["prophets"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
