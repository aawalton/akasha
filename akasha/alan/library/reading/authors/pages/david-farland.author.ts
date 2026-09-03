import type { Author } from "../author.page-type.ts"

export const davidFarland = {
  id: "01a06807-f091-7009-9da3-3d4d16a8abee",
  pageTypeSlug: "author",
  slug: "david-farland",
  title: "David Farland",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
