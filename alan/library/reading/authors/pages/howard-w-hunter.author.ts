import type { Author } from "../author.page-type.ts"

export const howardWHunter = {
  id: "01a06807-f091-7014-9b03-8e79f803fae6",
  pageTypeSlug: "author",
  type: "author",
  slug: "howard-w-hunter",
  title: "Howard W. Hunter",
  partOfCollections: ["prophets"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
