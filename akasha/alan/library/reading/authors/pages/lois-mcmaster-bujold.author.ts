import type { Author } from "../author.page-type.ts"

export const loisMcmasterBujold = {
  id: "01a06807-f091-7023-8bce-3bd6062c49df",
  pageTypeSlug: "author",
  slug: "lois-mcmaster-bujold",
  title: "Lois McMaster Bujold",
  partOfSlugs: ["science-fiction-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies Author
