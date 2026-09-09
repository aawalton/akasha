import type { Author } from "../author.page-type.ts"

export const arthurConanDoyle = {
  id: "01a06807-f090-7005-b5cc-fca9a588ec84",
  pageTypeSlug: "author",
  type: "author",
  slug: "arthur-conan-doyle",
  title: "Arthur Conan Doyle",
  partOfCollections: ["mystery-and-detective"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
