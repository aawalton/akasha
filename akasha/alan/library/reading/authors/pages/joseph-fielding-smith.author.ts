import type { Author } from "../author.page-type.ts"

export const josephFieldingSmith = {
  id: "01a06807-f091-701f-a7fe-dc109c242a7f",
  pageTypeSlug: "author",
  slug: "joseph-fielding-smith",
  title: "Joseph Fielding Smith",
  partOfSlugs: ["prophets"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
