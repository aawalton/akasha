import type { Author } from "../author.page-type.ts"

export const haroldBLee = {
  id: "01a06807-f091-7012-a9a2-441545651234",
  pageTypeSlug: "author",
  slug: "harold-b-lee",
  title: "Harold B. Lee",
  partOfSlugs: ["prophets"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
