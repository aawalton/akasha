import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const gordonBHinckley = {
  id: "01a06807-f091-7011-9d39-7e1cd987932e",
  type: "page-type/author",
  slug: "gordon-b-hinckley",
  title: "Gordon B. Hinckley",
  partOfCollections: ["author-collection/prophets"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
