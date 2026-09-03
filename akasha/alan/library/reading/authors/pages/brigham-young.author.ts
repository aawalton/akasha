import type { Author } from "../author.page-type.ts"

export const brighamYoung = {
  id: "01a06807-f091-7001-8395-48c8672e0fe5",
  pageTypeSlug: "author",
  slug: "brigham-young",
  title: "Brigham Young",
  partOfSlugs: ["prophets"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
