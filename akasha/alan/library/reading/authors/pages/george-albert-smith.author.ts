import type { Author } from "../author.page-type.ts"

export const georgeAlbertSmith = {
  id: "01a06807-f091-7010-9412-c44675c78f08",
  pageTypeSlug: "author",
  slug: "george-albert-smith",
  title: "George Albert Smith",
  partOfSlugs: ["prophets"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
