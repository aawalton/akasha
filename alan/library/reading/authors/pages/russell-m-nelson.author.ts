import type { Author } from "../author.page-type.types.ts"

export const russellMNelson = {
  id: "01a06807-f091-7029-9175-26c7dfb68063",
  pageTypeSlug: "author",
  type: "author",
  slug: "russell-m-nelson",
  title: "Russell M. Nelson",
  partOfCollections: ["prophets"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
