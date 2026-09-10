import type { Author } from "../author.page-type.types.ts"

export const josephFieldingSmith = {
  id: "01a06807-f091-701f-a7fe-dc109c242a7f",
  pageTypeSlug: "author",
  type: "author",
  slug: "joseph-fielding-smith",
  title: "Joseph Fielding Smith",
  partOfCollections: ["prophets"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
