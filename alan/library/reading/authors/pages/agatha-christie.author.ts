import type { Author } from "../author.page-type.types.ts"

export const agathaChristie = {
  id: "01a06807-f090-7000-8517-02da4478e7e9",
  pageTypeSlug: "author",
  type: "author",
  slug: "agatha-christie",
  title: "Agatha Christie",
  partOfCollections: ["mystery-and-detective"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
