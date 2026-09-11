import type { Author } from "akasha/alan/library/reading/authors/author.page-type.types.ts"

export const georgeAlbertSmith = {
  id: "01a06807-f091-7010-9412-c44675c78f08",
  type: "author",
  slug: "george-albert-smith",
  title: "George Albert Smith",
  partOfCollections: ["prophets"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
