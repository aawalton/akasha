import type { Book } from "../../book.page-type.ts"

export const bushidoOnlineFriendsAndFoes = {
  id: "019db533-f390-7a64-aaa9-25077ea137de",
  pageTypeSlug: "book",
  slug: "bushido-online-friends-and-foes",
  title: "Bushido Online: Friends and Foes",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 2,
  ownLength: 130000,
  ownProgress: 130000,
  publishedAt: "2018-02-01",
  partOfSlugs: ["book-series/bushido-online"],
  source: "kindle",
  externalId: "B078TS4XPG",
  externalLink: "https://amazon.com/dp/B078TS4XPG",
} as const satisfies Book
