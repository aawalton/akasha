import type { Author } from "../author.page-type.ts"

export const willWight = {
  id: "01a06807-f091-702f-9fce-bd7769cc18a4",
  pageTypeSlug: "author",
  type: "author",
  slug: "will-wight",
  title: "Will Wight",
  partOfCollections: ["fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
