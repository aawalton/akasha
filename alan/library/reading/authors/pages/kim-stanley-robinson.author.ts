import type { Author } from "../author.page-type.types.ts"

export const kimStanleyRobinson = {
  id: "01a06807-f091-7021-9de1-7673daac0adf",
  pageTypeSlug: "author",
  type: "author",
  slug: "kim-stanley-robinson",
  title: "Kim Stanley Robinson",
  partOfCollections: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Author
