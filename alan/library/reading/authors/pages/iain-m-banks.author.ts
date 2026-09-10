import type { Author } from "../author.page-type.types.ts"

export const iainMBanks = {
  id: "01a06807-f091-7015-a2cf-d1da2f4b0b96",
  pageTypeSlug: "author",
  type: "author",
  slug: "iain-m-banks",
  title: "Iain M. Banks",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
