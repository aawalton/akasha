import type { Author } from "../author.page-type.ts"

export const gordonBHinckley = {
  id: "01a06807-f091-7011-9d39-7e1cd987932e",
  pageTypeSlug: "author",
  slug: "gordon-b-hinckley",
  title: "Gordon B. Hinckley",
  partOfCollections: ["prophets"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
