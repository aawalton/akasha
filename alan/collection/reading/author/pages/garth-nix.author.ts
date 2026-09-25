import type { Author } from "akasha/alan/collection/reading/author/author.page-type.types.ts"

export const garthNix = {
  id: "01a06807-f091-700f-a911-bbe08202a969",
  type: "page-type/author",
  slug: "garth-nix",
  title: "Garth Nix",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Author
