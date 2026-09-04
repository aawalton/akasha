import type { Author } from "../author.page-type.ts"

export const charlesDickens = {
  id: "01a06807-f091-7003-bb8e-3234bce0dbd5",
  pageTypeSlug: "author",
  slug: "charles-dickens",
  title: "Charles Dickens",
  partOfSlugs: ["classics-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
