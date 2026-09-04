import type { Author } from "../author.page-type.ts"

export const garthNix = {
  id: "01a06807-f091-700f-a911-bbe08202a969",
  pageTypeSlug: "author",
  slug: "garth-nix",
  title: "Garth Nix",
  partOfSlugs: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
