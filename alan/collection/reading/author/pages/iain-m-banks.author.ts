import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const iainMBanks = {
  id: "01a06807-f091-7015-a2cf-d1da2f4b0b96",
  type: "page-type/author",
  slug: "iain-m-banks",
  title: "Iain M. Banks",
  partOfCollections: ["author-collection/science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
