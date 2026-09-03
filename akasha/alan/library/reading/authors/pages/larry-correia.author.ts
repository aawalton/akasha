import type { Author } from "../author.page-type.ts"

export const larryCorreia = {
  id: "01a06807-f091-7022-8465-f95186084322",
  pageTypeSlug: "author",
  slug: "larry-correia",
  title: "Larry Correia",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
