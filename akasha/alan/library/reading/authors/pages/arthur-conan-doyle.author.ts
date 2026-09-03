import type { Author } from "../author.page-type.ts"

export const arthurConanDoyle = {
  id: "01a06807-f090-7005-b5cc-fca9a588ec84",
  pageTypeSlug: "author",
  slug: "arthur-conan-doyle",
  title: "Arthur Conan Doyle",
  partOfSlugs: ["mystery-and-detective"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
