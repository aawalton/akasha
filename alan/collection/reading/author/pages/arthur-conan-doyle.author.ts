import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const arthurConanDoyle = {
  id: "01a06807-f090-7005-b5cc-fca9a588ec84",
  type: "page-type/author",
  slug: "arthur-conan-doyle",
  title: "Arthur Conan Doyle",
  partOfCollections: ["author-collection/mystery-and-detective"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:05.936Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Author
