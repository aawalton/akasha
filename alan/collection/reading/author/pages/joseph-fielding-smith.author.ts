import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const josephFieldingSmith = {
  id: "01a06807-f091-701f-a7fe-dc109c242a7f",
  type: "page-type/author",
  slug: "joseph-fielding-smith",
  title: "Joseph Fielding Smith",
  partOfCollections: ["author-collection/prophets"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
