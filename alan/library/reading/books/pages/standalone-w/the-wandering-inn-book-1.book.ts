import type { Book } from "../../book.page-type.ts"

export const theWanderingInnBook1 = {
  id: "019f35ab-0b5d-7dc7-8e5e-1ffd1b22f3aa",
  pageTypeSlug: "book",
  slug: "the-wandering-inn-book-1",
  title: "The Wandering Inn",
  kind: "read",
  status: "following",
  unitSlug: "words",
  ownProgress: 10.33,
  source: "the-wandering-inn",
  externalLink: "https://wanderinginn.com",
} as const satisfies Book
