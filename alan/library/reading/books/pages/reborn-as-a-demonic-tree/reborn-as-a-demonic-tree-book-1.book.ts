import type { Book } from "../../book.page-type.ts"

export const rebornAsADemonicTreeBook1 = {
  id: "019db533-f391-74a9-b53e-39949c36fe3c",
  pageTypeSlug: "book",
  slug: "reborn-as-a-demonic-tree-book-1",
  title: "Reborn as a Demonic Tree",
  status: "completed",
  author: "XKarnation, Goldcrab, Der-Shing Helmer",
  unitSlug: "words",
  position: 1,
  ownLength: 154500,
  ownProgress: 154500,
  publishedAt: "2023-11-14",
  partOfSlugs: ["book-series/reborn-as-a-demonic-tree"],
  source: "kindle",
  externalId: "B0CC423R7C",
  externalLink: "https://amazon.com/dp/B0CC423R7C",
} as const satisfies Book
