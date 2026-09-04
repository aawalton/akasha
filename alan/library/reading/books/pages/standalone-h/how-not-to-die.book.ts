import type { Book } from "../../book.page-type.ts"

export const howNotToDie = {
  id: "019db533-f39e-710a-8db9-627ed3254a36",
  pageTypeSlug: "book",
  slug: "how-not-to-die",
  title: "How Not to Die",
  kind: "read",
  status: "not-started",
  author: "Michael Greger, Gene Stone",
  unitSlug: "words",
  ownLength: 264000,
} as const satisfies Book
