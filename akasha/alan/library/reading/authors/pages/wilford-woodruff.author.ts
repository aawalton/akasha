import type { Author } from "../author.page-type.ts"

export const wilfordWoodruff = {
  id: "01a06807-f091-702e-b243-12c0e3c2df28",
  pageTypeSlug: "author",
  slug: "wilford-woodruff",
  title: "Wilford Woodruff",
  partOfSlugs: ["prophets"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
