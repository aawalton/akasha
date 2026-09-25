import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWanderingInnBook1 = {
  id: "019f35ab-0b5d-7dc7-8e5e-1ffd1b22f3aa",
  type: "page-type/book",
  slug: "the-wandering-inn-book-1",
  title: "The Wandering Inn",
  status: "following",
  unit: "unit/words",
  ownProgress: 10.33,
  externalIdentity: [{ source: "the-wandering-inn", externalLink: "https://wanderinginn.com" }],
} as const satisfies Book
